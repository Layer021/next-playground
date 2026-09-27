import { transformFileAsync } from '@babel/core';
import path from 'node:path';

const targets = [
  ['ProductCatalogWithCompiler.tsx', 'compiled', 1],
  ['ProductListWithCompiler.tsx', 'compiled', 1],
  ['SalesAnalyticsWithCompiler.tsx', 'compiled', 1],
  ['RhfWatchWithCompiler.tsx', 'compiled', 1],
  ['RhfUseWatchWithCompiler.tsx', 'compiled', 1],
  ['InventorySubscriptionWithCompiler.tsx', 'compiled', 1],
  ['MutatingSortWithCompiler.tsx', 'compiled', 2],
  ['ProductCatalogWithoutCompiler.tsx', 'excluded', 0],
  ['ProductListWithoutCompiler.tsx', 'excluded', 0],
  ['SalesAnalyticsWithoutCompiler.tsx', 'excluded', 0],
  ['RhfWatchWithoutCompiler.tsx', 'excluded', 0],
  ['InventorySubscriptionWithoutCompiler.tsx', 'excluded', 0],
  ['MutatingSortWithoutCompiler.tsx', 'excluded', 0],
];

const componentDirectory = path.join(
  process.cwd(),
  'components/page/react_compiler',
);

function eventLocation(event) {
  return event.fnLoc?.start?.line
    ?? event.detail?.loc?.start?.line
    ?? event.detail?.options?.loc?.start?.line
    ?? '?';
}

function eventReason(event) {
  const detail = event.detail ?? {};
  return detail.reason
    ?? detail.description
    ?? detail.category
    ?? detail.options?.reason
    ?? detail.options?.description
    ?? detail.options?.category
    ?? '理由なし';
}

let hasFailure = false;

for (const [filename, expected, minimumSuccesses] of targets) {
  const events = [];
  const filepath = path.join(componentDirectory, filename);

  try {
    await transformFileAsync(filepath, {
      babelrc: false,
      configFile: false,
      parserOpts: { plugins: ['typescript', 'jsx'] },
      plugins: [[
        'babel-plugin-react-compiler',
        {
          compilationMode: 'annotation',
          panicThreshold: 'none',
          logger: {
            logEvent(_source, event) {
              events.push(event);
            },
          },
        },
      ]],
    });
  } catch (error) {
    hasFailure = true;
    console.log(`❌ ${filename}: Babel変換に失敗`);
    console.error(error);
    continue;
  }

  const successes = events.filter((event) => event.kind === 'CompileSuccess');
  const errors = events.filter((event) => (
    event.kind === 'CompileError' || event.kind === 'PipelineError'
  ));
  const diagnostics = events.filter((event) => event.kind === 'CompileDiagnostic');

  if (expected === 'compiled') {
    if (successes.length < minimumSuccesses || errors.length > 0) {
      hasFailure = true;
      console.log(`❌ ${filename}: コンパイル成功数 ${successes.length}/${minimumSuccesses}`);
    } else {
      console.log(`✨ ${filename}: ${successes.length}関数をコンパイル`);
    }

    for (const event of successes) {
      const name = event.fnName || '(anonymous)';
      const slots = event.memoSlots == null ? '?' : event.memoSlots;
      console.log(`   ${name} (L${eventLocation(event)}) memoSlots=${slots}`);
    }
  } else if (successes.length === 0) {
    console.log(`⏭️  ${filename}: use no memoで除外`);
  } else {
    hasFailure = true;
    console.log(`❌ ${filename}: OFF側で${successes.length}関数がコンパイルされています`);
  }

  for (const event of [...errors, ...diagnostics]) {
    console.log(`   ⚠️ L${eventLocation(event)} ${eventReason(event)}`);
  }
}

if (hasFailure) {
  process.exitCode = 1;
}

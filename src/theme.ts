import { toArray } from '@antfu/utils';
import { getColors } from './primer';
import { Themes } from './colors';

export default function getTheme({ style, name, soft = false, black = false }) {
  // Usage: `pick({ light: "lightblue", dark: "darkblue" })`
  const pick = (options) => options[style];

  const leafTheme = (key: keyof typeof Themes, op = '') =>
    pick({
      dark: Themes[key][0] + op,
      // black: (Themes[key][1] ? Themes[key][1] : Themes[key][0]) + op,
    });

  const primer = getColors(style);

  const foreground = leafTheme('foreground');
  const secondaryForeground = leafTheme('secondaryForeground');
  const activeForeground = leafTheme('activeForeground');
  const primary = leafTheme('primary');

  const border = soft ? leafTheme('lowBorder') : leafTheme('border');
  const background = black
    ? '#000'
    : soft
    ? leafTheme('lowBackground')
    : leafTheme('background');

  const activeBackground = black
    ? '#050505'
    : soft
    ? leafTheme('lowActiveBackground')
    : leafTheme('activeBackground');

  const selectionBackgroundInActive = pick({
    light: '#22222208',
    dark: '#eeeeee08',
  });

  const selectionBackgroundActive = pick({
    light: '#22222215',
    dark: '#eeeeee15',
  });
  const selectionBackground = pick({ light: '#22222215', dark: '#eeeeee15' });

  const theme = {
    name,
    base: pick({ light: 'vs', dark: 'vs-dark' }),
    colors: {
      focusBorder: '#00000000',
      foreground,
      descriptionForeground: secondaryForeground,
      errorForeground: leafTheme('red'),

      'textLink.foreground': primary,
      'textLink.activeForeground': primary,
      'textBlockQuote.background': background,
      'textBlockQuote.border': border,
      'textCodeBlock.background': background,
      'textPreformat.foreground': primer.gray[6],
      'textSeparator.foreground': primer.gray[3],

      'button.background': primary,
      'button.foreground': background,
      'button.hoverBackground': primary,

      'checkbox.background': activeBackground,
      'checkbox.border': pick({ light: primer.gray[3], dark: primer.gray[1] }),

      'dropdown.background': background,
      'dropdown.border': border,
      'dropdown.foreground': foreground,
      'dropdown.listBackground': activeBackground,

      'input.background': activeBackground,
      'input.border': border,
      'input.foreground': foreground,
      'input.placeholderForeground': secondaryForeground,
      'inputOption.activeBackground': leafTheme('ignored'),

      'badge.foreground': background,
      'badge.background': secondaryForeground,

      'progressBar.background': primary,

      'titleBar.activeForeground': activeForeground,
      'titleBar.activeBackground': background,
      'titleBar.inactiveForeground': primer.gray[5],
      'titleBar.inactiveBackground': background,
      'titleBar.border': activeBackground,

      'activityBar.foreground': foreground,
      'activityBar.inactiveForeground': leafTheme('ignored'),
      'activityBar.background': background,
      'activityBarBadge.foreground': background,
      'activityBarBadge.background': activeForeground,
      'activityBar.activeBorder': primary,
      'activityBar.border': border,

      'sideBar.foreground': activeForeground,
      'sideBar.background': background,
      'sideBar.border': border,
      'sideBarTitle.foreground': foreground,
      'sideBarSectionHeader.foreground': foreground,
      'sideBarSectionHeader.background': background,
      'sideBarSectionHeader.border': border,

      'list.hoverForeground': foreground,
      'list.inactiveSelectionForeground': foreground,
      'list.activeSelectionForeground': foreground,
      'list.hoverBackground': activeBackground,
      'list.inactiveSelectionBackground': activeBackground,
      'list.activeSelectionBackground': activeBackground,
      'list.inactiveFocusBackground': background,
      'list.focusBackground': activeBackground,

      'tree.indentGuidesStroke': pick({
        light: primer.gray[2],
        dark: primer.gray[1],
      }),

      'notificationCenterHeader.foreground': primer.gray[5],
      'notificationCenterHeader.background': background,
      'notifications.foreground': foreground,
      'notifications.background': background,
      'notifications.border': border,
      'notificationsErrorIcon.foreground': leafTheme('red'),
      'notificationsWarningIcon.foreground': leafTheme('orange'),
      'notificationsInfoIcon.foreground': leafTheme('blue'),

      'pickerGroup.border': primer.gray[2],
      'pickerGroup.foreground': foreground,
      'quickInput.background': background,
      'quickInput.foreground': foreground,

      'statusBar.foreground': activeForeground,
      'statusBar.background': background,
      'statusBar.border': border,
      'statusBar.noFolderBackground': background,
      'statusBar.debuggingBackground': activeBackground,
      'statusBar.debuggingForeground': activeForeground,
      'statusBarItem.prominentBackground': activeBackground,

      'editorGroupHeader.tabsBackground': background,
      'editorGroupHeader.tabsBorder': border,
      'editorGroup.border': border,

      'tab.activeForeground': foreground,
      'tab.inactiveForeground': primer.gray[5],
      'tab.inactiveBackground': background,
      'tab.activeBackground': background,
      'tab.hoverBackground': activeBackground,
      'tab.unfocusedHoverBackground': background,
      'tab.border': border,
      'tab.unfocusedActiveBorderTop': border,
      'tab.activeBorder': border,
      'tab.unfocusedActiveBorder': border,
      'tab.activeBorderTop': secondaryForeground,

      'breadcrumb.foreground': primer.gray[5],
      'breadcrumb.focusForeground': foreground,
      'breadcrumb.background': activeBackground,
      'breadcrumb.activeSelectionForeground': selectionBackgroundActive,
      'breadcrumbPicker.background': background,

      'editor.foreground': foreground,
      'editor.background': background,
      'editorWidget.background': background,
      'editor.foldBackground': pick({ light: '#22222210', dark: '#eeeeee10' }),
      'editor.lineHighlightBackground': activeBackground,
      'editorLineNumber.foreground': leafTheme('ignored'),
      'editorLineNumber.activeForeground': activeForeground,
      'editorIndentGuide.background': pick({
        light: '#00000015',
        dark: '#ffffff15',
      }),
      'editorIndentGuide.activeBackground': pick({
        light: '#00000030',
        dark: '#ffffff30',
      }),
      'editorWhitespace.foreground': pick({
        light: '#00000015',
        dark: '#ffffff15',
      }),
      // 'editorCursor.foreground': primary,

      'editor.findMatchBackground': pick({
        light: '#e6cc7744',
        dark: '#e6cc7722',
      }),
      'editor.findMatchHighlightBackground': pick({
        light: '#e6cc7766',
        dark: '#e6cc7744',
      }),
      'editor.inactiveSelectionBackground': selectionBackgroundInActive,
      'editor.selectionBackground': selectionBackground,
      'editor.selectionHighlightBackground': selectionBackgroundInActive,
      'editor.wordHighlightBackground': pick({
        light: '#1c6b4805',
        dark: '#1c6b4805',
      }),
      'editor.wordHighlightStrongBackground': pick({
        light: '#1c6b4810',
        dark: '#1c6b4810',
      }),
      'editorBracketMatch.background': pick({
        light: '#1c6b4820',
        dark: '#4d937520',
      }),

      'diffEditor.insertedTextBackground': pick({
        light: '#1c6b4815',
        dark: '#4d937522',
      }),
      'diffEditor.removedTextBackground': pick({
        light: '#ab595910',
        dark: '#ab595922',
      }),

      'scrollbar.shadow': pick({ light: '#6a737d33', dark: '#0000' }),
      'scrollbarSlider.background': leafTheme('faded'),
      'scrollbarSlider.hoverBackground': leafTheme('ignored'),
      'scrollbarSlider.activeBackground': leafTheme('ignored'),
      'editorOverviewRuler.border': primer.white,

      'panel.background': background,
      'panel.border': border,
      'panelTitle.activeBorder': primary,
      'panelTitle.activeForeground': foreground,
      'panelTitle.inactiveForeground': primer.gray[5],
      'panelInput.border': pick({
        light: primer.gray[2],
        dark: primer.gray[1],
      }),

      'terminal.foreground': foreground,
      'terminal.selectionBackground': selectionBackground,
      'terminal.ansiBrightBlack': pick({ light: '#aaaaaa', dark: '#777777' }),
      'terminal.ansiBrightBlue': leafTheme('blue'),
      'terminal.ansiBrightCyan': leafTheme('cyan'),
      'terminal.ansiBrightGreen': leafTheme('green'),
      'terminal.ansiBrightMagenta': leafTheme('magenta'),
      'terminal.ansiBrightRed': leafTheme('red'),
      'terminal.ansiBrightWhite': pick({ light: '#dddddd', dark: '#ffffff' }),
      'terminal.ansiBrightYellow': leafTheme('yellow'),
      'terminal.ansiBlack': pick({
        light: Themes.background[0],
        dark: Themes.foreground[1],
      }),
      'terminal.ansiBlue': leafTheme('blue'),
      'terminal.ansiCyan': leafTheme('cyan'),
      'terminal.ansiGreen': leafTheme('green'),
      'terminal.ansiMagenta': leafTheme('magenta'),
      'terminal.ansiRed': leafTheme('red'),
      'terminal.ansiWhite': pick({
        light: Themes.foreground[0],
        dark: Themes.foreground[0],
      }),
      'terminal.ansiYellow': leafTheme('yellow'),

      'gitDecoration.addedResourceForeground': leafTheme('green'),
      'gitDecoration.modifiedResourceForeground': leafTheme('blue'),
      'gitDecoration.deletedResourceForeground': leafTheme('red'),
      'gitDecoration.untrackedResourceForeground': leafTheme('cyan'),
      'gitDecoration.ignoredResourceForeground': leafTheme('ignored'),
      'gitDecoration.conflictingResourceForeground': leafTheme('orange'),
      'gitDecoration.submoduleResourceForeground': leafTheme(
        'secondaryForeground'
      ),

      'editorGutter.modifiedBackground': leafTheme('blue'),
      'editorGutter.addedBackground': leafTheme('green'),
      'editorGutter.deletedBackground': leafTheme('red'),

      'editorBracketHighlight.foreground1': leafTheme('cyan'),
      'editorBracketHighlight.foreground2': leafTheme('green'),
      'editorBracketHighlight.foreground3': leafTheme('orange'),
      'editorBracketHighlight.foreground4': leafTheme('magenta'),
      'editorBracketHighlight.foreground5': leafTheme('yellow'),
      'editorBracketHighlight.foreground6': leafTheme('blue'),

      'debugToolBar.background': background,
      'editor.stackFrameHighlightBackground': pick({
        light: primer.yellow[1],
        dark: '#a707',
      }),
      'editor.focusedStackFrameHighlightBackground': pick({
        light: primer.yellow[2],
        dark: '#b808',
      }),

      'peekViewEditor.matchHighlightBackground': pick({ dark: '#ffd33d33' }),
      'peekViewResult.matchHighlightBackground': pick({ dark: '#ffd33d33' }),
      'peekViewEditor.background': background,
      'peekViewResult.background': background,

      'settings.headerForeground': foreground,
      'settings.modifiedItemIndicator': primary,
      'welcomePage.buttonBackground': primer.gray[1],
      'welcomePage.buttonHoverBackground': primer.gray[2],

      'problemsErrorIcon.foreground': leafTheme('red'),
      'problemsWarningIcon.foreground': leafTheme('orange'),
      'problemsInfoIcon.foreground': leafTheme('blue'),

      'editorError.foreground': leafTheme('red'),
      'editorWarning.foreground': leafTheme('orange'),
      'editorInfo.foreground': leafTheme('blue'),
      'editorHint.foreground': leafTheme('green'),

      'editorGutter.commentRangeForeground': leafTheme('ignored'),
      'editorGutter.foldingControlForeground': leafTheme('secondaryForeground'),

      'editorInlayHint.foreground': leafTheme('punctuation'),
      'editorInlayHint.background': '#00000000',

      'editorStickyScroll.background': activeBackground,
      'editorStickyScrollHover.background': activeBackground,

      'menu.separatorBackground': border,
    },
    semanticHighlighting: true,
    semanticTokenColors: {
      namespace: leafTheme('namespace'),
      property: leafTheme('property'),
      interface: leafTheme('interface'),
      type: leafTheme('interface'),
      class: leafTheme('class'),
      method: leafTheme('method'),
      function: leafTheme('functionCall'),
    },
    tokenColors: [
      {
        scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
        settings: {
          foreground: leafTheme('comment'),
        },
      },
      {
        scope: [
          'delimiter.bracket',
          'delimiter',
          'invalid.illegal.character-not-allowed-here.html',
          'keyword.operator.rest',
          'keyword.operator.spread',
          'keyword.operator.type.annotation',
          'keyword.operator.relational.ts',
          'meta.brace',
          'meta.tag.block.any.html',
          'meta.tag.inline.any.html',
          'meta.tag.structure.input.void.html',
          'meta.type.annotation',
          'storage.type.function.arrow',
          'keyword.operator.type',
          'meta.objectliteral.ts',
          'keyword.operator.comparison',
          'punctuation',
        ],
        settings: {
          foreground: leafTheme('punctuations'),
        },
      },
      {
        scope: [
          'constant',
          'entity.name.constant',
          'variable.language',
          'meta.definition.variable',
        ],
        settings: {
          foreground: leafTheme('constant'),
        },
      },
      {
        scope: 'variable.language.this',
        settings: {
          foreground: leafTheme('this'),
        },
      },
      // {
      //   scope: ['entity', 'entity.name'],
      //   settings: {
      //     foreground: vitesse('function'),
      //   },
      // },
      {
        scope: 'variable.parameter.function',
        settings: {
          foreground,
        },
      },
      {
        scope: ['entity.name.tag', 'tag.html'],
        settings: {
          foreground: leafTheme('keyword'),
        },
      },
      {
        scope: [
          'meta.function',
          'meta.definition.method',
          'support.function.magic',
          'support.function.constructor',
        ],
        settings: {
          foreground: leafTheme('function'),
        },
      },
      {
        scope: ['meta.function-call', 'meta.method-call'],
        settings: {
          foreground: leafTheme('functionCall'),
        },
      },
      {
        name: 'Built-in functions',
        scope: ['support.function'],
        settings: {
          foreground: leafTheme('systemFunctionCall'),
        },
      },
      {
        scope: [
          'keyword',
          'storage.type.class.jsdoc',
          'punctuation.definition.block.tag',
          'support.function.construct',
        ],
        settings: {
          foreground: leafTheme('keyword'),
        },
      },
      {
        scope: ['storage', 'storage.type', 'support.type.builtin'],
        settings: {
          foreground: leafTheme('builtin'),
        },
      },
      {
        scope: ['constant.language', 'constant.language.null'],
        settings: {
          foreground: leafTheme('builtinConstant'),
        },
      },
      {
        scope: [
          'storage.modifier.package',
          'storage.modifier.import',
          'storage.type.java',
        ],
        settings: {
          foreground,
        },
      },
      {
        scope: [
          'string',
          'string punctuation.section.embedded source',
          'attribute.value',
        ],
        settings: {
          foreground: leafTheme('string'),
        },
      },
      {
        scope: [
          'punctuation.definition.string',
          'punctuation.support.type.property-name',
        ],
        settings: {
          foreground: leafTheme('string'),
        },
      },
      {
        scope: 'support',
        settings: {
          foreground: leafTheme('property'),
        },
      },
      {
        scope: [
          'property',
          'meta.property-name',
          'meta.object-literal.key',
          'entity.name.tag.yaml',
          'attribute.name',
        ],
        settings: {
          foreground: leafTheme('property'),
        },
      },
      {
        scope: [
          'entity.other.attribute-name',
          'invalid.deprecated.entity.other.attribute-name.html',
        ],
        settings: {
          foreground: leafTheme('variable'),
        },
      },
      {
        scope: ['variable', 'identifier'],
        settings: {
          foreground: leafTheme('variable'),
        },
      },
      {
        scope: ['support.type.primitive', 'entity.name.type'],
        settings: {
          foreground: leafTheme('type'),
        },
      },
      {
        scope: 'namespace',
        settings: {
          foreground: leafTheme('namespace'),
        },
      },
      {
        scope: ['keyword.operator', 'meta.var.expr.ts'],
        settings: {
          foreground: leafTheme('operator'),
        },
      },
      {
        scope: 'invalid.broken',
        settings: {
          fontStyle: 'italic',
          foreground: primer.red[7],
        },
      },
      {
        scope: 'invalid.deprecated',
        settings: {
          fontStyle: 'italic',
          foreground: primer.red[7],
        },
      },
      {
        scope: 'invalid.illegal',
        settings: {
          fontStyle: 'italic',
          foreground: primer.red[7],
        },
      },
      {
        scope: 'invalid.unimplemented',
        settings: {
          fontStyle: 'italic',
          foreground: primer.red[7],
        },
      },
      {
        scope: 'carriage-return',
        settings: {
          fontStyle: 'italic underline',
          background: pick({ light: primer.red[5], dark: primer.red[6] }),
          foreground: primer.gray[0],
          content: '^M',
        },
      },
      {
        scope: 'message.error',
        settings: {
          foreground: primer.red[7],
        },
      },
      {
        scope: 'string variable',
        settings: {
          foreground: leafTheme('string'),
        },
      },
      {
        scope: ['source.regexp', 'string.regexp'],
        settings: {
          foreground: leafTheme('regex'),
        },
      },
      {
        scope: [
          'string.regexp.character-class',
          'string.regexp constant.character.escape',
          'string.regexp source.ruby.embedded',
          'string.regexp string.regexp.arbitrary-repitition',
        ],
        settings: {
          foreground: leafTheme('string'),
        },
      },
      {
        scope: 'string.regexp constant.character.escape',
        settings: {
          foreground: leafTheme('yellow'),
        },
      },
      {
        scope: ['support.constant'],
        settings: {
          foreground: leafTheme('constant'),
        },
      },
      {
        scope: ['constant.numeric', 'number'],
        settings: {
          foreground: leafTheme('number'),
        },
      },
      {
        scope: ['keyword.other.unit'],
        settings: {
          foreground: leafTheme('builtin'),
        },
      },
      {
        scope: ['constant.language.boolean'],
        settings: {
          foreground: leafTheme('boolean'),
        },
      },
      {
        scope: 'meta.module-reference',
        settings: {
          foreground: primary,
        },
      },
      {
        scope: 'punctuation.definition.list.begin.markdown',
        settings: {
          foreground: leafTheme('orange'),
        },
      },
      {
        scope: 'punctuation.definition.variable',
        settings: {
          foreground: leafTheme('variablePunctuation'),
        },
      },
      {
        scope: [
          'punctuation.definition',
          'punctuation.section',
          'punctuation.terminator.expression',
          'keyword.operator.class',
          'punctuation.separator.inheritance',
        ],
        settings: {
          foreground: leafTheme('punctuations'),
        },
      },
      {
        scope: ['markup.heading', 'markup.heading entity.name'],
        settings: {
          fontStyle: 'bold',
          foreground: primary,
        },
      },
      {
        scope: 'markup.quote',
        settings: {
          foreground: leafTheme('interface'),
        },
      },
      {
        scope: 'markup.italic',
        settings: {
          fontStyle: 'italic',
          foreground,
        },
      },
      {
        scope: 'markup.bold',
        settings: {
          fontStyle: 'bold',
          foreground,
        },
      },
      {
        scope: 'markup.raw',
        settings: {
          foreground: primary,
        },
      },
      {
        scope: [
          'markup.deleted',
          'meta.diff.header.from-file',
          'punctuation.definition.deleted',
        ],
        settings: {
          background: primer.red[0],
          foreground: primer.red[7],
        },
      },
      {
        scope: [
          'markup.inserted',
          'meta.diff.header.to-file',
          'punctuation.definition.inserted',
        ],
        settings: {
          background: primer.green[0],
          foreground: primer.green[6],
        },
      },
      {
        scope: ['markup.changed', 'punctuation.definition.changed'],
        settings: {
          background: primer.orange[1],
          foreground: primer.orange[6],
        },
      },
      {
        scope: ['markup.ignored', 'markup.untracked'],
        settings: {
          foreground: primer.gray[1],
          background: primer.blue[6],
        },
      },
      {
        scope: 'meta.diff.range',
        settings: {
          foreground: pick({ light: primer.purple[5], dark: primer.purple[6] }),
          fontStyle: 'bold',
        },
      },
      {
        scope: 'meta.diff.header',
        settings: {
          foreground: primer.blue[6],
        },
      },
      {
        scope: 'meta.separator',
        settings: {
          fontStyle: 'bold',
          foreground: primer.blue[6],
        },
      },
      {
        scope: 'meta.output',
        settings: {
          foreground: primer.blue[6],
        },
      },
      {
        scope: [
          'brackethighlighter.tag',
          'brackethighlighter.curly',
          'brackethighlighter.round',
          'brackethighlighter.square',
          'brackethighlighter.angle',
          'brackethighlighter.quote',
        ],
        settings: {
          foreground: primer.gray[6],
        },
      },
      {
        scope: 'brackethighlighter.unmatched',
        settings: {
          foreground: primer.red[7],
        },
      },
      {
        scope: [
          'constant.other.reference.link',
          'string.other.link',
          'punctuation.definition.string.begin.markdown',
          'punctuation.definition.string.end.markdown',
        ],
        settings: {
          foreground: leafTheme('string'),
        },
      },
      {
        scope: ['markup.underline.link.markdown'],
        settings: {
          foreground: secondaryForeground,
          fontStyle: 'underline',
        },
      },
      {
        scope: ['type.identifier'],
        settings: {
          foreground: leafTheme('class'),
        },
      },
      {
        scope: ['support.class', 'support.other.namespace'],
        settings: {
          foreground: leafTheme('classUse'),
        },
      },
      {
        scope: ['entity.other.attribute-name.html.vue'],
        settings: {
          foreground: leafTheme('function'),
        },
      },
      {
        scope: ['invalid.illegal.unrecognized-tag.html'],
        settings: {
          fontStyle: 'normal',
        },
      },
    ],
    rules: [],
  };

  // monaco rules
  const rules: any[] = [];

  theme.tokenColors.forEach(({ scope, settings }: any) => {
    for (const s of toArray(scope)) {
      rules.push({
        token: s,
        foreground: settings.foreground?.replace('#', ''),
      });
    }
  });

  theme.rules = rules;

  return theme;
}

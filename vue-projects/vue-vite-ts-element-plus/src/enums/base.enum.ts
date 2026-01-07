// 核心枚举定义
export enum ValueTypeEnum {
  INTEGER = 1, // 整数
  FLOAT = 2, // 浮点数
  TEXT = 3, // 短文本
  LONG_TEXT = 4, // 长文本
  DATE_TIME = 5, // 日期时间
  DATE = 6, // 日期
  TIME = 7, // 时间
  JSON = 8, // JSON
  PASSWORD = 9, // 密码
  LINK = 10, // 链接
  BOOLEAN = 11, // 布尔
}

// 类型标签映射配置
export const ValueTypeConfig = {
  [ValueTypeEnum.INTEGER]: {
    label: '整数',
    icon: 'integer',
    value: 1,
  },
  [ValueTypeEnum.FLOAT]: {
    label: '浮点数',
    icon: 'float',
    value: 2,
  },
  [ValueTypeEnum.TEXT]: {
    label: '短文本',
    icon: 'text',
    value: 3,
  },
  [ValueTypeEnum.LONG_TEXT]: {
    label: '长文本',
    icon: 'long-text',
    value: 4,
  },
  [ValueTypeEnum.DATE_TIME]: {
    label: '日期时间',
    icon: 'date-time',
    value: 5,
  },
  [ValueTypeEnum.DATE]: {
    label: '日期',
    icon: 'date',
    value: 6,
  },
  [ValueTypeEnum.TIME]: {
    label: '时间',
    icon: 'time',
    value: 7,
  },
  [ValueTypeEnum.JSON]: {
    label: 'JSON',
    icon: 'json',
    value: 8,
  },
  [ValueTypeEnum.PASSWORD]: {
    label: '密码',
    icon: 'password',
    value: 9,
  },
  [ValueTypeEnum.LINK]: {
    label: '链接',
    icon: 'link',
    value: 10,
  },
  [ValueTypeEnum.BOOLEAN]: {
    label: '布尔',
    icon: 'boolean',
    value: 11,
  },
} as const

// 获取类型
export function getValueType(value: ValueTypeEnum) {
  return ValueTypeConfig[value]
}

// export function getValueType(value: number) {
//   return ValueTypeConfig[value]
// }


/*
* https://icones.js.org/
* https://unocss.nodejs.cn/presets/icons
* https://icon-sets.iconify.design/
* https://iconify.design/
* */

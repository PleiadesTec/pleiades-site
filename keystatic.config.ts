import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  singletons: {
    site: singleton({
      label: '站点设置',
      path: 'src/content/site/',
      format: 'yaml',
      schema: {
        companyName: fields.text({ label: '公司名称', validation: { isRequired: true } }),
        description: fields.text({ label: '站点描述', multiline: true, validation: { isRequired: true } }),
        logo: fields.image({ label: 'Logo', directory: 'public/images/site', publicPath: '/images/site' }),
        navigation: fields.array(
          fields.object({
            label: fields.text({ label: '名称', validation: { isRequired: true } }),
            href: fields.text({ label: '链接', validation: { isRequired: true } }),
          }),
          { label: '导航', itemLabel: props => props.fields.label.value }
        ),
        contact: fields.object({
          phone: fields.text({ label: '联系电话', validation: { isRequired: true } }),
          email: fields.text({ label: '联系邮箱', validation: { isRequired: true } }),
          registeredAddress: fields.text({ label: '注册地址' }),
        }, { label: '联系方式' }),
        footer: fields.object({
          domain: fields.text({ label: '域名' }),
          filingNumber: fields.text({ label: '备案号' }),
        }, { label: '页脚信息' }),
      },
    }),
    home: singleton({
      label: '首页',
      path: 'src/content/home/',
      format: 'yaml',
      schema: {
        intro: fields.text({ label: '首页介绍', multiline: true }),
        contactPrompt: fields.text({ label: '联系引导', multiline: true }),
        heroSlides: fields.array(
          fields.object({
            title: fields.text({ label: '标题', validation: { isRequired: true } }),
            description: fields.text({ label: '介绍', multiline: true }),
            image: fields.image({ label: '图片', directory: 'public/images/banners', publicPath: '/images/banners' }),
            alt: fields.text({ label: '图片描述', description: '有信息含义的图片请填写描述；装饰图片可留空。' }),
            buttonLabel: fields.text({ label: '按钮文字' }),
            buttonHref: fields.text({ label: '按钮链接' }),
            enabled: fields.checkbox({ label: '启用', defaultValue: true }),
          }),
          { label: 'Banner 列表', itemLabel: props => props.fields.title.value, validation: { length: { min: 0, max: 5 } } }
        ),
      },
    }),
  },
  collections: {
    posts: collection({
      label: '文章',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: '标题' } }),
        excerpt: fields.text({ label: '摘要', multiline: true }),
        publishedAt: fields.date({ label: '发布日期' }),
        cover: fields.image({ label: '封面', directory: 'public/images/posts', publicPath: '/images/posts' }),
        content: fields.markdoc({
          label: '正文',
          options: {
            image: {
              directory: 'public/images/posts',
              publicPath: '/images/posts',
            },
          },
        }),
      },
    }),
    services: collection({
      label: '业务与服务',
      slugField: 'title',
      path: 'src/content/services/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: '标题' } }),
        summary: fields.text({ label: '业务摘要', multiline: true }),
        cover: fields.image({ label: '封面', directory: 'public/images/services', publicPath: '/images/services' }),
        content: fields.markdoc({
          label: '正文',
          options: { image: { directory: 'public/images/services', publicPath: '/images/services' } },
        }),
      },
    }),
    pages: collection({
      label: '单页',
      slugField: 'title',
      path: 'src/content/pages/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: '标题' } }),
        description: fields.text({ label: '页面描述', multiline: true }),
        content: fields.markdoc({
          label: '正文',
          options: { image: { directory: 'public/images/pages', publicPath: '/images/pages' } },
        }),
      },
    }),
  },
});

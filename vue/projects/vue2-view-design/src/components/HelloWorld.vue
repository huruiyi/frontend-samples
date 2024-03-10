<template>
    <div>
        <Card>
            <ul>
                <li :key="i" v-for="(next, i) in whatsNext">
                    <a :href="next.href" class="subheading mx-3" target="_blank"> {{ next.text }} </a>
                </li>
            </ul>
        </Card>
        <Card>
            <ul>
                <li :key="i" v-for="(link, i) in importantLinks">
                    <a :key="i" :href="link.href" class="subheading mx-3" target="_blank"> {{ link.text }} </a>
                </li>
            </ul>
        </Card>
        <Card>
            <ul>
                <li :key="i" v-for="(eco, i) in ecosystem">
                    <a :key="i" :href="eco.href" class="subheading mx-3" target="_blank"> {{ eco.text }} </a>
                </li>
            </ul>
        </Card>
    </div>

</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader'
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify'
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify'
      }
    ],
    importantLinks: [
      {
        text: 'Documentation',
        href: 'https://vuetifyjs.com'
      },
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com'
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify'
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs'
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify'
      }
    ],
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com/components/api-explorer'
      },
      {
        text: 'Select a layout',
        href: 'https://vuetifyjs.com/layout/pre-defined'
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions'
      }
    ]
  })
}
</script>

<style>
    ul{
        list-style: none;
    }
</style>

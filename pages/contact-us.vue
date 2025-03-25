<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useContactStore } from '~/store/contact'

const { t } = useI18n()
const contactStore = useContactStore()

const routes = computed(() => {
  return [
    {
      name: t('contact_us'),
      path: '',
    },
  ]
})

const contactLoading = computed(() => contactStore.contactLoading)
const contactTop = computed(() => contactStore.contactList?.slice(0, 2))
const contactBottom = computed(() => contactStore.contactList?.slice(2))

contactStore.fetchContactList()

const { data: info } = await useAsyncData('fetchInfo', () =>
  useApi().$get('common/Info/')
)
</script>

<template>
  <section class="mb-auto">
    <BaseBreadcrumb :routes="routes" />
    <CommonSectionWrapper class="pt-8" :title="t('contact_us')">
      <template #default>
        <Transition name="fade" mode="out-in">
          <div :key="contactLoading">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ContactCard
                v-for="(card, idx) in contactLoading ? 2 : contactTop"
                :key="idx"
                v-bind="{ card, loading: contactLoading }"
              />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ContactCardDirection
                v-for="(card, idx) in contactLoading ? 4 : contactBottom"
                :key="idx"
                title-class="!text-lg"
                v-bind="{ card, loading: contactLoading }"
              />
            </div>
          </div>
        </Transition>
        <StudentCardOnlyMap :data="info[0]" class="mt-6 mb-12" />
      </template>
    </CommonSectionWrapper>
  </section>
</template>

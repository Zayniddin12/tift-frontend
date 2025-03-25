<template>
  <div class="bg-white p-5 md:p-6 card-shadow divide-y">
    <div class="md:pb-4">
      <h1 class="text-xl md:text-[28px] font-bold leading-9 mb-4">
        {{ $t('location') }}
      </h1>
      <div>
        <div
          class="w-full flex justify-center flex-wrap gap-10 relative overflow-hidden"
        >
          <div class="lg:w-[45%] max-sm:w-full sm:w-full">
            <iframe
              ref="mapIframe"
              :src="`https://yandex.com/map-widget/v1/?ll=69.232194%2C41.262087&mode=search&oid=90576118773&ol=biz&sll=69.266010%2C41.278014&sspn=0.164108%2C0.085339&text=Tift%20yujniy&z=17`"
              height="400"
              width="100%"
              frameborder="1"
              allowfullscreen="allowfullscreen"
            >
            </iframe>
          </div>
          <div class="lg:hidden w-full h-px bg-black/60" />
          <div class="lg:w-[45%] max-sm:w-full sm:w-full">
            <iframe
              ref="mapIframe"
              :src="`https://yandex.com/map-widget/v1/?ll=69.298969%2C41.278014&mode=search&oid=181109921704&ol=biz&sll=10.854186%2C49.182076&sspn=84.023438%2C38.162463&text=Toshkent%20xalqaro%20moliyaviy%20boshqaruv%20va%20texnologiyalar%20universiteti&z=17`"
              height="400"
              width="100%"
              frameborder="1"
              allowfullscreen="allowfullscreen"
            >
            </iframe>
          </div>
        </div>
      </div>
      <h3 class="mt-3 md:mt-5 font-semibold text-base md:text-xl">
        {{ $t('tashkent_institute_of_management_and_economics') }}
      </h3>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  data: {
    location: {
      id: number
      location_name: string
      latitude: number
      longitude: number
    }[]
  }
}

defineProps<Props>()
</script>

<style scoped>
.card-shadow {
  box-shadow: 0 2.767256498336792px 2.2138051986694336px 0 #00000008,
    0 6.650102138519287px 5.32008171081543px 0 #00000005,
    0 12.521552085876465px 10.017241477966309px 0 #00000005,
    0 22.3363094329834px 17.869047164916992px 0 #00000004,
    0 41.777610778808594px 33.422088623046875px 0 #00000003,
    0 100px 80px 0 #00000002;
}
</style>

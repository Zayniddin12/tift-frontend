<template>
  <div class="relative flex">
    <BaseSkeleton width="112px" height="136px" loading />

    <div class="bg-white p-4 md:px-7 h-fit py-5 md:min-h-[136px] w-full">
      <BaseSkeleton width="50%" height="28px" loading />
      <BaseSkeleton
        preloader-class="mt-2 mb-4"
        width="75%"
        height="20px"
        loading
      />
      <div class="flex gap-6 max-sm:flex-col">
        <div v-for="key in 3" :key="key" class="flex gap-2">
          <BaseSkeleton width="24px" height="24px" loading />
          <BaseSkeleton width="100px" height="24px" loading />
        </div>
      </div>
    </div>
  </div>
</template>

<template>
  <CommonSectionWrapper title="Profile">
    <div class="flex-y-center max-md:flex-col relative">
      <BaseUploadAvatar
        v-model="innerAvatar"
        class="absolute-y max-md:!static max-md:!translate-y-0 left-0"
      />
      <div class="w-[278px] h-[254px] shrink-0 max-md:hidden" />
      <div
        class="flex justify-center gap-y-6 flex-col bg-white h-max px-3 max-md:py-3 md:pl-6 w-full min-h-[214px]"
      >
        <div>
          <CommonSectionTitle :title="info?.personal_information?.full_name" />
        </div>
        <div class="flex-y-center gap-2">
          <p class="text-green">
            {{
              info?.status === 'moderation' ? $t('abiturent') : $t('student')
            }}
          </p>
          <div class="w-1 h-1 rounded-full bg-[#D9D9D9]" />
          <p class="text-green">ID {{ info?.id }}</p>
        </div>
        <div>
          <p class="md:max-w-[60%] text-gray-1 text-sm font-normal leading-130">
            {{
              info?.status === 'moderation'
                ? $t('abiturent_description', {
                    faculty: info?.education_program?.direction,
                  })
                : $t('profile_description', {
                    faculty: info?.education_program?.direction,
                  })
            }}
          </p>
        </div>
      </div>
    </div>
  </CommonSectionWrapper>
  <CommonSectionWrapper>
    <ProfileSectionPersonalInfo :personal-info="info?.personal_information" />
    <ProfileSectionEducationBackround
      :background="info?.education_background"
    />
    <ProfileSectionEducatinPrograms
      :id="info?.id"
      :link="info?.online_exam_link"
      :programs="info?.education_program"
      :status="info?.status"
      :degree="info?.current_degree"
      :info="info"
    />
  </CommonSectionWrapper>
</template>
<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

interface Props {
  avatar: string
  info: any
}

const props = defineProps<Props>()
const authStore = useAuthStore()

const innerAvatar = ref(props?.avatar || '')

watch(
  () => innerAvatar.value,
  () => {
    const formData = new FormData()
    formData.append('avatar', innerAvatar.value || '')
    useApi()
      .$post('users/profile/avatar/update/', {
        body: formData,
      })
      .then(() => {
        authStore.getUser()
      })
  }
)
</script>

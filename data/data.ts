import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import type { ICountry, IRegion } from '~/types/services/common.types'

export const ranks = [
  {
    title: 'Undergraduate program',
    count: 5,
  },
  {
    title: 'Students',
    count: 1200,
  },
  {
    title: 'professors (PhD and DSc)',
    count: 2,
  },
  {
    title: 'International cooperation',
    count: 60,
  },
  {
    title: 'Branches',
    count: 2,
  },
  {
    title: 'Campuses',
    count: 4,
  },
]

export const stats = [
  {
    title:
      'Awarded by TIFT University and TIFT foundation in scholarships in 2023',
    count: 16000000,
  },
  {
    title: 'Scholarships granted in the last 5 years',
    count: 8600,
  },
  {
    title: 'Nationalities represented',
    count: 97,
  },
]

export const aboutCardsData = [
  {
    slug: '/page/campus/',
    title: 'about_the_institute_list[0].title',
    image: '/images/about/the-institute.png',
    icon: '/svg/about-the-institute/0.svg',
    subtitle: 'about_the_institute_list[0].subtitle',
  },
  {
    slug: '/page/auditorium',
    title: 'about_the_institute_list[1].title',
    subtitle: 'about_the_institute_list[1].subtitle',
    image: '/images/about/the-audit.png',
    icon: '/svg/about-the-institute/1.svg',
  },
  {
    slug: '/page/activisthall',
    title: 'about_the_institute_list[2].title',
    subtitle: 'about_the_institute_list[2].subtitle',
    image: '/images/about/the-activist-hall.png',
    icon: '/svg/about-the-institute/2.svg',
  },
  {
    slug: '/for-students/academic-library',
    title: 'about_the_institute_list[3].title',
    subtitle: 'about_the_institute_list[3].subtitle',
    image: '/images/about/the-library.png',
    icon: '/svg/about-the-institute/3.svg',
  },
]

export const contents = [
  {
    title: 'discover_more_list[0].title',
    description: 'discover_more_list[0].subtitle',
    btnText: 'discover_more_list[0].btn',
    link: '/for-students/academic-library',
  },
  {
    title: 'discover_more_list[1].title',
    description: 'discover_more_list[1].subtitle',
    btnText: 'discover_more_list[1].btn',
    link: '/admissions-and-scholarships/entry-requirements',
  },
  {
    title: 'discover_more_list[2].title',
    description: 'discover_more_list[2].subtitle',
    btnText: 'discover_more_list[2].btn',
    link: '/events',
  },
]

export const videos = [
  {
    title: 'Tashkent branch',
    description:
      'There’s never a dull moment in the bustling capital of Spain. Get a feel for what student life is like at our fast-paced Madrid campus.',
    poster: '/images/tashkent.png',
    videoLink: '',
  },
  {
    title: 'Fergana branch',
    description:
      'In Fergana, you’ll be enchanted by its winding cobblestone streets, breathtaking medieval castle, and grandiose historical sites. Dive in!',
    poster: '/images/fergana.png',
    videoLink: '',
  },
]

export const reasons = [
  {
    title: 'Tashkent branch',
    description:
      'There’s never a dull moment in the bustling capital of Spain. Get a feel for what student life is like at our fast-paced Madrid campus.',
  },
  {
    title: 'Fergana branch',
    description:
      'In Fergana, you’ll be enchanted by its winding cobblestone streets, breathtaking medieval castle, and grandiose historical sites. Dive in!',
  },
  {
    title: 'Tashkent branch',
    description:
      'There’s never a dull moment in the bustling capital of Spain. Get a feel for what student life is like at our fast-paced Madrid campus.',
  },
  {
    title: 'Fergana branch',
    description:
      'In Fergana, you’ll be enchanted by its winding cobblestone streets, breathtaking medieval castle, and grandiose historical sites. Dive in!',
  },
  {
    title: 'Tashkent branch',
    description:
      'There’s never a dull moment in the bustling capital of Spain. Get a feel for what student life is like at our fast-paced Madrid campus.',
  },
  {
    title: 'Fergana branch',
    description:
      'In Fergana, you’ll be enchanted by its winding cobblestone streets, breathtaking medieval castle, and grandiose historical sites. Dive in!',
  },
]

export const news = [
  {
    title: 'Tashkent branch',
    description:
      'There’s never a dull moment in the bustling capital of Spain. Get a feel for what student life is like at our fast-paced Madrid campus.',
  },
  {
    title: 'Fergana branch',
    description:
      'In Fergana, you’ll be enchanted by its winding cobblestone streets, breathtaking medieval castle, and grandiose historical sites. Dive in!',
  },
  {
    title: 'Tashkent branch',
    description:
      'There’s never a dull moment in the bustling capital of Spain. Get a feel for what student life is like at our fast-paced Madrid campus.',
  },
  {
    title: 'Fergana branch',
    description:
      'In Fergana, you’ll be enchanted by its winding cobblestone streets, breathtaking medieval castle, and grandiose historical sites. Dive in!',
  },
  {
    title: 'Tashkent branch',
    description:
      'There’s never a dull moment in the bustling capital of Spain. Get a feel for what student life is like at our fast-paced Madrid campus.',
  },
  {
    title: 'Fergana branch',
    description:
      'In Fergana, you’ll be enchanted by its winding cobblestone streets, breathtaking medieval castle, and grandiose historical sites. Dive in!',
  },
  {
    title: 'Fergana branch',
    description:
      'In Fergana, you’ll be enchanted by its winding cobblestone streets, breathtaking medieval castle, and grandiose historical sites. Dive in!',
  },
  {
    title: 'Tashkent branch',
    description:
      'There’s never a dull moment in the bustling capital of Spain. Get a feel for what student life is like at our fast-paced Madrid campus.',
  },
  {
    title: 'Fergana branch',
    description:
      'In Fergana, you’ll be enchanted by its winding cobblestone streets, breathtaking medieval castle, and grandiose historical sites. Dive in!',
  },
]

export const persons = [
  {
    title: 'Tester Testerov',
    image: '/images/person.png',
    description:
      'There’s never a dull moment in the bustling capital of Spain. Get a feel for what student life is like at our fast-paced Madrid campus.',
  },
  {
    title: 'Tester Testerov',
    image: '/images/person.png',
    description:
      'There’s never a dull moment in the bustling capital of Spain. Get a feel for what student life is like at our fast-paced Madrid campus.',
  },
  {
    title: 'Tester Testerov',
    image: '/images/person.png',
    description:
      'There’s never a dull moment in the bustling capital of Spain. Get a feel for what student life is like at our fast-paced Madrid campus.',
  },
  {
    title: 'Tester Testerov',
    image: '/images/person.png',
    description:
      'There’s never a dull moment in the bustling capital of Spain. Get a feel for what student life is like at our fast-paced Madrid campus.',
  },
  {
    title: 'Tester Testerov',
    image: '/images/person.png',
    description:
      'There’s never a dull moment in the bustling capital of Spain. Get a feel for what student life is like at our fast-paced Madrid campus.',
  },
  {
    title: 'Tester Testerov',
    image: '/images/person.png',
    description:
      'There’s never a dull moment in the bustling capital of Spain. Get a feel for what student life is like at our fast-paced Madrid campus.',
  },
]

export const singleUserData = {
  image: '/images/leadership-image.png',
  alt: 'Leadership',
  fullname: 'Sherzod Rajabov',
  position: 'Rector of the Tashkent Institute of Management and Economics',
  description:
    'Tashkent Institute of Management and Economics implements multi-level educational programs in the fields of accounting and auditing, management and economics. In these areas of activity, talented and aspiring professionals can find great opportunities for self-realization, the advantages of our graduates are highly valued in the labor market: professional skills, mobility, a wide network of business contacts, the ability to form financial knowledge for themselves, ability to stay ahead of the current needs of their company or organization, professional environment.',
  email: 'rajabay@gmail.com',
  phone: '+998 12 345 67 89',
  days: '(Mon, Tue, Wed) 14:00 - 16:00',
}

export const singleData = {
  title: 'University of Oxford',
  subtitle:
    'Aristotle University of Thessaloniki is the sixth oldest university in Greece and one of the top ranked university.',
  textContent:
    'Aristotle University of Thessaloniki is the sixth oldest university in Greece and one of the top ranked university. Aristotle University of Thessaloniki is the sixth oldest university in Greece and one of the top ranked university',
  viewCount: 1234,
}

export const locationSectionData = {
  title: 'Tashkent Institute of Management and Economics',
  address: "114 Shota Rustaveli ko'chasi, Tashkent, Uzbekistan",
  phone: '+998 12 345 67 89',
  email: 'Financialid@tiftedu.uz',
  website: 'TIMEEDU.uz',
  location: '',
}

export const cooperations = [
  {
    image: '/images/cooperation-logo.png',
    alt: 'cooperation-logo',
    title: 'University of Oxford',
    description:
      'Aristotle University of Thessaloniki is the sixth oldest university in Greece and one of the top ranked university. Aristotle University of Thessaloniki is the sixth oldest university in Greece and one of the top ranked university',
  },
  {
    image: '/images/cooperation-logo.png',
    alt: 'cooperation-logo',
    title: 'University of Oxford',
    description:
      'Aristotle University of Thessaloniki is the sixth oldest university in Greece and one of the top ranked university',
  },
  {
    image: '/images/cooperation-logo.png',
    alt: 'cooperation-logo',
    title: 'University of Oxford',
    description:
      'Aristotle University of Thessaloniki is the sixth oldest university in Greece and one of the top ranked university',
  },
  {
    image: '/images/cooperation-logo.png',
    alt: 'cooperation-logo',
    title: 'University of Oxford',
    description:
      'Aristotle University of Thessaloniki is the sixth oldest university in Greece and one of the top ranked university',
  },
  {
    image: '/images/cooperation-logo.png',
    alt: 'cooperation-logo',
    title: 'University of Oxford',
    description:
      'Aristotle University of Thessaloniki is the sixth oldest university in Greece and one of the top ranked university',
  },
  {
    image: '/images/cooperation-logo.png',
    alt: 'cooperation-logo',
    title: 'University of Oxford',
    description:
      'Aristotle University of Thessaloniki is the sixth oldest university in Greece and one of the top ranked university',
  },
]

export const vacancies = [
  {
    name: 'Professor-teacher of the department',
    time: '09:00 - 18:00',
    location: 'Tashkent city',
  },
  {
    name: 'Professor-teacher of the department',
    time: '09:00 - 18:00',
    location: 'Tashkent city',
  },
  {
    name: 'Professor-teacher of the department',
    time: '09:00 - 18:00',
    location: 'Tashkent city',
  },
  {
    name: 'Professor-teacher of the department',
    time: '09:00 - 18:00',
    location: 'Tashkent city',
  },
  {
    name: 'Professor-teacher of the department',
    time: '09:00 - 18:00',
    location: 'Tashkent city',
  },
  {
    name: 'Professor-teacher of the department',
    time: '09:00 - 18:00',
    location: 'Tashkent city',
  },
  {
    name: 'Professor-teacher of the department',
    time: '09:00 - 18:00',
    location: 'Tashkent city',
  },
  {
    name: 'Professor-teacher of the department',
    time: '09:00 - 18:00',
    location: 'Tashkent city',
  },
  {
    name: 'Professor-teacher of the department',
    time: '09:00 - 18:00',
    location: 'Tashkent city',
  },
  {
    name: 'Professor-teacher of the department',
    time: '09:00 - 18:00',
    location: 'Tashkent city',
  },
]

export const routes = [
  {
    path: '/about-us',
    name: 'Who we are?',
  },
  {
    path: '/about-us/leadership',
    name: 'Leadership',
  },
  {
    path: '/about-us/university',
    name: 'TIFT University',
  },
  {
    path: '/about-us/why-choose',
    name: 'Why choose TIFT University',
  },
  {
    path: '/about-us/international-cooperation',
    name: 'International cooperation',
  },
  {
    path: '/about-us/vacancies',
    name: 'Vacancies',
  },
]

export const educationRoutes = [
  {
    path: '/education',
    name: 'Foundation',
  },
  {
    path: '/education/bachelor',
    name: 'Bachelor degree',
  },
  {
    path: '/education/masters-degree',
    name: 'Masters degree',
  },
  {
    path: '/education/second-speciality',
    name: '2nd specialty',
  },
]

export const studentsRoutes = [
  {
    path: '/for-students/academic-library',
    name: 'Academic library',
  },
  {
    path: '/for-students/talent-and-career',
    name: 'Talent and Career',
  },
]

export const experienceRoutes = [
  {
    path: '/institute-experience/branch',
    name: 'Tashkent branch',
  },
  {
    path: '/institute-experience/for-students',
    name: 'Students',
  },
  {
    path: '/institute-experience/faculties',
    name: 'Faculty',
  },
  {
    path: '/institute-experience/scientific-works',
    name: 'Scientific works',
  },
]

export const teamProfileCards = [
  {
    id: 1,
    image: 'https://picsum.photos/200/300',
    name: 'John Doe',
    position: 'CEO',
  },
  {
    id: 2,
    image: 'https://picsum.photos/200/300',
    name: 'John Doe',
    position: 'CEO',
  },
  {
    id: 3,
    image: 'https://picsum.photos/200/300',
    name: 'John Doe',
    position: 'CEO',
  },
  {
    id: 4,
    image: 'https://picsum.photos/200/300',
    name: 'John Doe',
    position: 'CEO',
  },
  {
    id: 5,
    image: 'https://picsum.photos/200/300',
    name: 'John Doe',
    position: 'CEO',
  },
]

export const teamSingleData = {
  name: 'John Doe',
  position: 'CEO',
  about:
    'Tashkent Institute of Management and Economics implements multi-level educational programs in the fields of accounting and auditing, management and economics. In these areas of activity, talented and aspiring professionals can find great opportunities for self-realization, the advantages of our graduates are highly valued in the labor market:' +
    ' professional skills, mobility, a wide network of business contacts, the ability to form financial knowledge for themselves, ability to stay..',
  image: 'https://picsum.photos/600/400',
}

export const universityCategory = [
  {
    id: 1,
    title: 'International Department',
  },
  {
    id: 2,
    title: 'Marketing department',
  },
  {
    id: 3,
    title: 'Monitoring department',
  },
  {
    id: 4,
    title: 'Human Resources',
  },
  {
    id: 5,
    title: 'Accounting department',
  },
  {
    id: 6,
    title: 'Working with youth, spirituality and enlightenment department',
  },
  {
    id: 7,
    title: 'Education Quality Department',
  },
  {
    id: 8,
    title: 'Departments',
  },
]

export const aboutEmployees = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    position: 'CEO',
    image: 'https://picsum.photos/300/300',
  },
  {
    id: 3,
    first_name: 'Jane',
    last_name: 'Doe',
    position: 'CEO',
    image: 'https://picsum.photos/300/300',
  },
]

export const fakePaginationData = {
  total: 200,
  currentPage: 1,
  limit: 10,
  paginationButtons: true,
}

export const educationBachelorCategory = [
  { id: 1, title: 'Management' },
  { id: 2, title: 'Economy' },
]

export const admissionsScholarshipsRoutes = [
  {
    path: '/admissions-and-scholarships/admission-proccess',
    name: 'Registration',
  },
  {
    path: '/admissions-and-scholarships/entry-requirements',
    name: 'Requirements for entry',
  },
  {
    path: '/admissions-and-scholarships/contracts-and-grants',
    name: 'Contracts and Grants',
  },
  {
    path: '/admissions-and-scholarships/student-services',
    name: 'Student services',
  },
]

export const aboutUsRankings = [
  {
    id: 1,
    title: 'University worldwide',
    subtitle: 'QS WUR International students ranking',
    count: 1000,
  },
  {
    id: 2,
    title: 'University worldwide',
    subtitle: 'QS WUR International students ranking',
    count: 1000,
  },
  {
    id: 3,
    title: 'University worldwide',
    subtitle: 'QS WUR International students ranking',
    count: 1000,
  },
]

export const users = [
  {
    firstname: 'Yahyo',
    lastname: 'Mashrabov',
    position: 'Economic teacher',
  },
  {
    firstname: 'Yahyo',
    lastname: 'Mashrabov',
    position: 'Economic teacher',
  },
  {
    firstname: 'Yahyo',
    lastname: 'Mashrabov',
    position: 'Economic teacher',
  },
  {
    firstname: 'Yahyo',
    lastname: 'Mashrabov',
    position: 'Economic teacher',
  },
  {
    firstname: 'Yahyo',
    lastname: 'Mashrabov',
    position: 'Economic teacher',
  },
  {
    firstname: 'Yahyo',
    lastname: 'Mashrabov',
    position: 'Economic teacher',
  },
  {
    firstname: 'Yahyo',
    lastname: 'Mashrabov',
    position: 'Economic teacher',
  },
  {
    firstname: 'Yahyo',
    lastname: 'Mashrabov',
    position: 'Economic teacher',
  },
  {
    firstname: 'Yahyo',
    lastname: 'Mashrabov',
    position: 'Economic teacher',
  },
  {
    firstname: 'Yahyo',
    lastname: 'Mashrabov',
    position: 'Economic teacher',
  },
  {
    firstname: 'Yahyo',
    lastname: 'Mashrabov',
    position: 'Economic teacher',
  },
  {
    firstname: 'Yahyo',
    lastname: 'Mashrabov',
    position: 'Economic teacher',
  },
  {
    firstname: 'Yahyo',
    lastname: 'Mashrabov',
    position: 'Economic teacher',
  },
  {
    firstname: 'Yahyo',
    lastname: 'Mashrabov',
    position: 'Economic teacher',
  },
  {
    firstname: 'Yahyo',
    lastname: 'Mashrabov',
    position: 'Economic teacher',
  },
  {
    firstname: 'Yahyo',
    lastname: 'Mashrabov',
    position: 'Economic teacher',
  },
]

export const getAreaOfStudy = () => {
  const { t } = useI18n()

  return [
    {
      name: t('daytime'),
      value: 'daytime',
    },
    {
      name: t('part_time'),
      value: 'part_time',
    },
    {
      name: t('evening'),
      value: 'evening',
    },
  ]
}
export const getLevels = () => {
  const { t } = useI18n()

  return [
    {
      name: t('level_1'),
      value: 1,
    },
    {
      name: t('level_2'),
      value: 2,
    },
    {
      name: t('level_3'),
      value: 3,
    },
    {
      name: t('level_4'),
      value: 4,
    },
  ]
}

export const getLanguages = () => {
  const { t } = useI18n()

  return [
    {
      name: t('uzbek'),
      value: 'uz',
    },
    {
      name: t('russian'),
      value: 'ru',
    },
    {
      name: t('english'),
      value: 'en',
    },
  ]
}

export const educationWrapperData = (
  period_education: string,
  language: string[],
  location: IRegion,
  date_of_admission: string,
  type_of_education: string[]
) => {
  const { t, locale } = useI18n()
  return [
    {
      title: t('period_education'),
      value:
        period_education > 1
          ? `${period_education} ${t('years')}`
          : period_education
          ? `${period_education} ${t('year')}`
          : '-',
    },
    {
      title: t('language'),
      value: language?.map((item) => t(item.toLowerCase())) ?? '-',
    },
    {
      title: t('location'),
      value: location?.name ?? '-',
    },
    {
      title: t('date_of_admission'),
      value: dayjs(date_of_admission)
        .locale(locale.value)
        .format('DD MMMM, YYYY'),
    },
    {
      title: t('type_of_education'),
      value: type_of_education?.map((item) => t(item)) ?? '-',
    },
  ]
}

export const educationBachelorTabs = computed(() => {
  const { t } = useI18n()
  return [
    {
      title: t('general_information'),
      id: 1,
      icon: 'icon-chevron',
      slug: 1,
    },
    {
      title: t('study_plan'),
      id: 2,
      icon: 'icon-chevron',
      slug: 2,
    },
    {
      title: t('cooperation'),
      id: 3,
      icon: 'icon-chevron',
      slug: 3,
    },
    {
      title: t('admission_process'),
      id: 4,
      icon: 'icon-chevron',
      slug: 4,
    },
  ]
})

export const contractPrices = [
  {
    id: 1,
    degree: 'Bachelory',
    title: 'Management',
    image: '/images/fergana.png',
    price: 10000000,
  },
  {
    id: 2,
    degree: 'Bachelory',
    title: 'Economy',
    price: 10000000,
    image: '/images/fergana.png',
  },
  {
    id: 3,
    degree: 'Bachelory',
    title: 'Accounting and auditing',
    price: 10000000,
    image: '/images/fergana.png',
  },
  {
    id: 4,
    degree: 'Bachelory',
    title: 'IT',
    price: 10000000,
    image: '/images/fergana.png',
  },
  {
    id: 5,
    degree: 'Bachelory',
    title: 'Finance and financial technologies',
    image: '/images/fergana.png',
    price: 10000000,
  },
  {
    id: 6,
    degree: 'Bachelory',
    title: 'Marketing',
    image: '/images/fergana.png',
    price: 10000000,
  },
  {
    id: 7,
    degree: 'Bachelory',
    title: 'Insurance business',
    image: '/images/fergana.png',
    price: 10000000,
  },
  {
    id: 8,
    degree: 'Bachelory',
    title: 'Management',
    image: '/images/fergana.png',
    price: 10000000,
  },
]

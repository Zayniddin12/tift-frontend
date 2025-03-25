import { TArray } from 'ts-interface-checker'

export interface IEducationDirectionDetails {
  id: number
  education_type: number
  title: string
  slug: string
  brochure: string
  period: number
  language: string
  admission_date: string
  education_time_type: string
  description: string
  study_plan_description: string
  tuition_fee_description: string
  video_url: string
  tuition_fee: number
  cover_image: string
  region: number
}

export interface IEducationInfo {
  title: string
  body: string
  icon: string
}

export interface IEmployment {
  id: number
  full_name: string
  photo: string
  position: {
    title: string
    slug: string
  }
}

export interface IEducationFAQ {
  question: string
  answer: string
  order: string
}
export interface IEducationFAQList {
  faq: IEducationFAQ
  order: number
}

export interface IStudyTablePlan {
  year: number
  semesters: IStudyTableSemester[]
}
export interface IStudyTableSemester {
  semester: number
  subjects: IStudyTableItem[]
}

export interface IStudyTableItem {
  id: number
  title: string
  type: string
  credits: number
  syllabus: string
  professors: any[]
}

export interface IReasonList {
  id: number
  name: string
}

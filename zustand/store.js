import create from 'zustand'
import { devtools } from 'zustand/middleware'

const createUserSlice = (set, get) => ({
  user: { _id: null, firstName: '', lastName: '', email: '' },
  setUser: user => set(() => ({ user }))
})

const projectListSlice = (set, get) => ({
  projectListPage: 1,
  setProjectListPage: page => set({ projectListPage: page }),
  projectListLimit: 10,
  setProjectListLimit: limit => set({ projectListLimit: limit }),
  projectListSearch: '',
  setProjectListSearch: search => set({ projectListSearch: search })
})

const issueSlice = (set, get) => ({
  issueSearch: '',
  setIssueSearch: search => set({ issueSearch: search })
})

export const useStore = create(
  devtools((set, get) => ({
    ...createUserSlice(set, get),
    ...projectListSlice(set, get),
    ...issueSlice(set, get)
  }))
)

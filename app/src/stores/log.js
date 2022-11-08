import { defineStore } from 'pinia'
import { logAPI } from '@/services/api.js'

export const useLogStore = defineStore({
    id: 'log',
    state: () => {
      return {
        logs: [],
      }
    },
    getters: {
      getLogs: (state) => state.logs,
        getLogById: (state) => (id) => {
            return state.logs.filter(log => log.stock.stockID .toString() === id)
        },
        getLogByName: (state) => (name) => {
            return state.logs.filter(log => log.stock.item.name === name)
        },
        filterInbound: (state) => {
            return state.stocks.find(log => log.type === "inbound")
        },
        filterOutbound: (state) => {
            return state.stocks.find(log => log.type === "outbound")
        },
    },
    actions: {
        async fetch () {
          this.logs = await logAPI.getAll()
        },
        async add (log) {
          const response = await logAPI.saveNew(log)
          if (response.success) {
            const log_id = response.log_id
            this.logs.push({ ...log })
            return log_id
          }
          return false
        },
    
        delete (id) {
          this.logs = this.logs.filter((log) => log.id != id)
        }
      }
    
    })
<template>
  <div class="min-h-screen bg-angelBaby-100">
    <div class="mx-auto font-mono text-gray-700 max-w-7xl">
      <h1 class="pt-6 pl-8 text-xl">Inbound</h1>
      <div class="flex items-center pb-4">
        <label for="type" class="p-8 pt-6 mr-5 text-xl">Select Item:</label>
        <select name="type" v-model="choose" id="type" class="uppercase bg-gray-100 rounded-lg w-18">type
          <option value="id" selected>ID</option>
          <option value="Name">Name</option>
        </select>
        <label for="table-search" class="mx-10"></label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor"
              viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"></path>
            </svg>
          </div>
          <input type="text" id="table-search" v-model="search"
            class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items">
        </div>
        <button type="submit" @click="searchStock"
          class="p-2.5 ml-2 text-sm font-medium text-white rounded-lg bg-angelBaby-300  border border-angelBaby-300 hover:bg-blue-800 focus:ring-3 focus:outline-none focus:ring-angelBaby-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <span class="sr-only">Search</span>
        </button>
      </div>
      <div style="display: flex; justify-content: space-around">

        <div class="rounded-lg overflow-y-auto h-full relative">
          <table class="w-2/3 rounded-xl text-sm text-left text-gray-500 dark:text-gray-400 table-auto ml-10 ">
            <thead class="text-lg text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="py-3 px-6">
                  ItemID
                </th>
                <th scope="col" class="py-3 px-2">
                  Item Name
                </th>
                <th scope="col" class="py-3 px-6">
                  Description
                </th>
              </tr>
            </thead>
            <tbody v-for="product in products" v-bind:key="products.itemid">
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th @click="stockDetail(product)" scope="row"
                  class="py-4 px-10 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ product.itemID }}
                </th>
                <td @click="stockDetail(product)" class="py-4 px-10">
                  {{ product.name }}
                </td>
                <td @click="stockDetail(product)" class="py-4 px-10">
                  {{ product.description }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <div v-if="showModal"
            class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
            <div class="relative w-auto my-6 mx-auto max-w-6xl">
              <!--content-->
              <div
                class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <!--body-->
                <div class="relative p-6 flex-auto">
                  <p class="my-4 text-slate-500 text-lg leading-relaxed">
                    กรุณาเลือกสินค้าก่อน
                  </p>
                </div>
                <!--footer-->
                <div class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button" v-on:click="toggleModal()">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>


        <div v-if="selected != null"
          class="grid w-1/2 h-full grid-cols-2 gap-6 p-3 my-20 border-2 x-10 bg-angelBaby-200 right-2 ">
          <h3 class="float-left text-xl text-gray-50">
            Item Name
          </h3>
          <h3 class="float-left text-xl text-gray-50">
            {{ selected.name }}
          </h3>
          <h3 class="float-left text-xl text-gray-50">
            Description
          </h3>
          <h3 class="float-left text-xl text-gray-50">
            {{ selected.description }}
          </h3>

          <h3 class="float-left text-xl text-gray-50">
            Inbound-Date
          </h3>
          <input v-model="InboundDate" type="text" class="bg-gray-100 rounded-lg">
          <h3 class="float-left text-xl text-gray-50">
            Expire-Date
          </h3>
          <input v-model="expireDate" type="date" class="bg-gray-100 rounded-lg">
          <h3 class="float-left text-xl text-gray-50">
            Quantity
          </h3>
          <div class="text-white">
            <button v-on:click="decrement" class="rounded-lg p-2  bg-red-500 hover:bg-red-600">-</button>
            <input type="number" v-model="count"
              class="mx-2 w-20 text-black text-center overflow-hidden rounded-lg shadow bg-white border border-gray-300 ">
            <button v-on:click="increment" class="rounded-lg p-2  bg-green-500 hover:bg-green-600">+</button>
          </div>
          <button @click="addInbound"
            class="px-4 py-2 font-bold text-white rounded-lg bg hover:bg-[#10122e] bg-angelBaby-300"
            style="align-items: center;">
            Submit
          </button>
        </div>

        <div v-else
          class="grid w-1/2 h-full grid-cols-2 grid-rows-6 gap-6 p-3 my-20 border-2 x-10 bg-angelBaby-200 right-2 ">
          <h3 class="float-left text-xl text-gray-50">
            Item Name
          </h3>
          <h3> </h3>
          <h3 class="float-left text-xl text-gray-50">
            Description
          </h3>
          <h3> </h3>
          <h3 class="float-left text-xl text-gray-50">
            Inbound-Date
          </h3>
          <input v-model="InboundDate" type="text" class="bg-gray-100 rounded-lg" readonly="readonly">
          <h3 class="float-left text-xl text-gray-50">
            Expire-Date
          </h3>
          <input type="date" class="bg-gray-100 rounded-lg">
          <h3 class="float-left text-xl text-gray-50">
            Quantity
          </h3>
          <div class="text-white">
            <button v-on:click="decrement" class="rounded-lg p-2  bg-red-500 hover:bg-red-600">-</button>
            <input type="number" v-model="count"
              class="mx-2 w-20 text-black text-center overflow-hidden rounded-lg shadow bg-white border border-gray-300 ">
            <button v-on:click="" class="rounded-lg p-2  bg-green-500 hover:bg-green-600">+</button>
          </div>
          <button class="px-4 py-2 font-bold text-white rounded-lg bg hover:bg-[#10122e] bg-angelBaby-300"
            v-on:click="toggleModal()" style="align-items: center;">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useProductStore } from '@/stores/product.js'
import { useInboundStore } from '@/stores/inbound.js'
import { useAuthStore } from "@/stores/auth.js"
import moment from 'moment'
export default {
  setup() {
    const product_store = useProductStore()
    const inbound_store = useInboundStore()
    const auth_store = useAuthStore()
    return { product_store, inbound_store, auth_store }
  },

  data() {
    return {
      showModal: false,
      title: "stock List",
      selected: null,
      choose: 'id',
      search: "",
      products: null,
      inbounds: '',
      error: null,
      sortOption: 'default',
      count: 0,
      expireDate: '',
      InboundDate: '',
      inbound: {
        type: '',
        productInDate: '',
        stock: {
          expire: '',
          quantity: '',
          itemID: ''
        },
        userID: ''
      }
    }
  },
  watch: {},
  methods: {
    toggleModal: function () {
      this.showModal = !this.showModal;
    },
    async refreshStocks(data) {
      if (data.refresh) {
        await this.stock_store.fetch()
        this.stocks = this.stock_store.getStocks
      }
    },
    async refreshInbounds(data) {
      if (data.refresh) {
        await this.inbound_store.fetch()
        this.inbounds = this.inbound_store.getInbounds
      }
    },
    async searchStock(data) {
      this.refreshStocks(data)
      if (this.choose == "id") {
        this.stocks = this.stock_store.getStockById(this.search)
      }
      if (this.choose == "Name") {
        this.stocks = this.stock_store.getStockByName(this.search)
      }
    },
    stockDetail(product) {
      this.selected = product
    },
    increment() {
      this.count++;
    },
    decrement() {
      if (this.count > 1) { this.count--; }
    },
    async addInbound() {
      this.error = null

      console.log("clickAddInbound")
      this.inbound.type = "inbound"
      this.inbound.productInDate = this.InboundDate
      this.inbound.stock.quantity = this.count
      this.inbound.stock.itemID = this.selected.itemID
      this.inbound.stock.expire = this.expireDate
      this.inbound.userID = localStorage.getItem("userId")

      var date = new Date(this.inbound.stock.expire).toLocaleDateString().split("/")
      var year = String(date[2]).padStart(4, '0')
      var day = String(date[1]).padStart(2, '0')
      var month = String(date[0]).padStart(2, '0')
      this.inbound.stock.expire = day + "/" + month + "/" + year

      console.log(this.inbound)
      try {
        const inbound_id = await this.inbound_store.add(this.inbound)
        if (inbound_id) {
          console.log("add complete")
          this.$router.push('/history')
        }
      } catch (error) {
        this.error = error.message
        console.error(error)
      }
    }
  },
  async mounted() {
    console.log("mounted")
    console.log(this.InboundDate)
    if (localStorage.getItem("login_success") == "false") {
      this.$router.push('/login')
    }
    this.error = null

    try {
      await this.product_store.fetch()
      this.products = this.product_store.getProducts

      await this.inbound_store.fetch()
      this.inbounds = this.inbound_store.getInbounds

      this.InboundDate = moment().add(7, "hours").format("L")
      console.log()
    } catch (error) {
      this.error = error.message
    }
  }

}
</script>

<style scoped>
body {
  background-color: #E8F0FF;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
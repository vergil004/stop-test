import { createStore } from "vuex";
import {paymentsModule} from "@/store/paymentsModule";

export default createStore({
    modules:{
        payments: paymentsModule
    }
})
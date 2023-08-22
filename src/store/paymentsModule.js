import axios from "axios";
import { BaseUrl } from "@/helpers";
import format from "date-fns/format";

export const paymentsModule = {
  state: () => ({
    payments: [],
    isLoading: true,
    paymentsTypes: [],
  }),
  mutations: {
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setPayments(state, payments) {
      state.payments = payments;
    },
    setPaymentsTypes(state, types) {
      state.paymentsTypes = types;
    },
  },
  actions: {
    async getPayments({ commit }, filterValue) {
      commit("setLoading", true);
      const source = filterValue.source === "all" ? "" : filterValue.source;
      const filterDate = filterValue.date;
      const date = filterDate === null ? "" : format(filterDate, "yyyy-MM-dd");
      try {
        const response = await axios.get(`${BaseUrl}/payments`, {
          params: {
            source_id: source,
            date: date,
          },
        });
        commit("setPayments", response.data);
      } catch (error) {
        console.log(error);
      } finally {
        commit("setLoading", false);
      }
    },
    async getPaymentsTypes({ commit }) {
      try {
        const response = await axios.get(`${BaseUrl}/form_tss`);
        commit("setPaymentsTypes", response.data.types);
      } catch (error) {
        console.log(error);
      }
    },
  },
};

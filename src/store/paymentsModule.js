import axios from "axios";
import { BaseUrl } from "@/helpers";
import format from "date-fns/format";

export const paymentsModule = {
  state: () => ({
    payments: [],
    isLoading: true,
    paymentsTypes: [],
    paymentsStatuses: [],
    paymentsSources: [],
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
    setPaymentsStatuses(state, statuses) {
      state.paymentsStatuses = statuses;
    },
    setPaymentsSources(state, source) {
      state.paymentsSources = source;
    },
    addNewPayment(state, newPayment) {
      state.payments = [...state.payments, { ...newPayment }];
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
    async getPaymentsStatuses({ commit }) {
      try {
        const response = await axios.get(`${BaseUrl}/form_tss`);
        commit("setPaymentsStatuses", response.data.statuses);
      } catch (error) {
        console.log(error);
      }
    },
    async getPaymentsSources({ commit }) {
      try {
        const response = await axios.get(`${BaseUrl}/form_tss`);
        commit("setPaymentsSources", response.data.sources);
      } catch (error) {
        console.log(error);
      }
    },
    async setNewPayment({ commit }, bodyRequest) {
      try {
        const response = await axios.post(`${BaseUrl}/payments`, {
          client: bodyRequest.client,
          contract: bodyRequest.contract,
          type_id: bodyRequest.type,
          date: format(bodyRequest.date, "yyyy-MM-dd"),
          summ: bodyRequest.sum,
          source_id: bodyRequest.source,
          status_id: bodyRequest.status,
        });
        commit("addNewPayment", response.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};

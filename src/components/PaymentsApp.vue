<template>
  <div class="payments">
    <h4 class="h4">Список платежей</h4>
    <div class="payments__button">
      <button class="btn btn-primary" @click="openModal">
        Добавить платеж
      </button>
    </div>
    <div class="payments__filter">
      <div class="payments__filterItem">
        <div class="payments__filterName">Дата платежа:</div>
        <datepicker
          v-model="selectedDate"
          typeable
          clearable
          placeholder="гггг.мм.дд"
        />
      </div>
      <div class="payments__filterItem">
        <div class="payments__filterName">Источник платежа:</div>
        <select class="form-select" v-model="selectedSource">
          <option value="all" selected>Все источники</option>
          <option v-for="item in sources" :key="item.id" :value="item.id">
            {{ item.title }}
          </option>
        </select>
      </div>
    </div>
    <table class="table table-bordered" v-if="payments">
      <thead>
        <tr>
          <th>
            Клиент <img :src="icons.sort" width="16" alt="иконка сортировки" />
          </th>
          <th>Договор №</th>
          <th>
            Тип Платежа
            <img :src="icons.sort" width="16" alt="иконка сортировки" />
          </th>
          <th>
            Дата <img :src="icons.sort" width="16" alt="иконка сортировки" />
          </th>
          <th>Сумма(руб)</th>
          <th>Источник платежа</th>
          <th>
            Статус <img :src="icons.sort" width="16" alt="иконка сортировки" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="payment in payments" :key="payment.id">
          <td>{{ payment.client }}</td>
          <td>{{ payment.contract }}</td>
          <td>{{ typeIdTitle(payment.type_id) }}</td>
          <td>{{ payment.date }}</td>
          <td>{{ payment.summ }}</td>
          <td>{{ sourceIdTitle(payment.source_id) }}</td>
          <td>
            <span
              class="badge"
              :class="{
                'bg-secondary': payment.status_id === 1,
                'bg-warning': payment.status_id === 2,
                'bg-success': payment.status_id === 3,
              }"
            >
              {{ statusIdTitle(payment.status_id) }}</span
            >
          </td>
        </tr>
      </tbody>
    </table>
    <Transition name="fade">
      <modal-app v-model:show="showModal">
        <template v-slot:header>
          <h5 class="h5">Добавление нового платежа</h5>
        </template>
        <template v-slot:body>
          <AddPaymentForm v-model:show="showModal" />
        </template>
      </modal-app>
    </Transition>
  </div>
</template>

<script>
import Datepicker from "vue3-datepicker";
import sort from "../assets/img/icons/sort.svg";
import { mapActions, mapState } from "vuex";
import ModalApp from "@/components/ModalApp";
import AddPaymentForm from "@/components/AddPaymentForm";

export default {
  components: {
    Datepicker,
    ModalApp,
    AddPaymentForm,
  },
  data: () => ({
    icons: {
      sort,
    },
    selectedSource: "all",
    selectedDate: null,
    showModal: false,
  }),
  mounted() {
    this.getPayments({
      source: this.selectedSource,
      date: this.selectedDate,
    });
    this.getPaymentsTypes();
    this.getPaymentsStatuses();
    this.getPaymentsSources();
  },
  watch: {
    selectedSource(newValue) {
      this.getPayments({ source: newValue, date: this.selectedDate });
    },
    selectedDate(newValue) {
      this.getPayments({
        source: this.selectedSource,
        date: newValue,
      });
    },
  },
  computed: {
    ...mapState({
      payments: (state) => state.payments.payments,
      sources: (state) => state.payments.paymentsSources,
    }),
  },
  methods: {
    ...mapActions({
      getPayments: "getPayments",
      getPaymentsTypes: "getPaymentsTypes",
      getPaymentsStatuses: "getPaymentsStatuses",
      getPaymentsSources: "getPaymentsSources",
    }),
    sourceIdTitle(id) {
      switch (id) {
        case 1: {
          return "касса";
        }
        case 2: {
          return "карта";
        }
        case 3: {
          return "онлайн";
        }
        case 4: {
          return "перевод";
        }
        case 5: {
          return "зачет";
        }
        default: {
          return "р/счет";
        }
      }
    },
    typeIdTitle(id) {
      switch (id) {
        case 1: {
          return "Авансовый платеж";
        }
        case 2: {
          return "Ежемесячный платеж";
        }
        case 3: {
          return "депозит";
        }
        case 4: {
          return "выписка ЕГРН";
        }
        case 5: {
          return "выписка ЕГРН";
        }
        default: {
          return "источника не найдено";
        }
      }
    },
    statusIdTitle(id) {
      return id === 1 ? "Не оплачено" : id === 2 ? "Оплачено" : "Подтвержден";
    },
    openModal() {
      this.showModal = true;
    },
  },
};
</script>

<style scoped lang="scss">
.payments {
  .h4 {
    text-align: left;
  }
  &__button {
    display: flex;
    margin: 16px 0;
  }
  &__filter {
    display: flex;
    gap: 20px;
    margin-bottom: 16px;
    &Name {
      font-size: 16px;
      text-align: left;
    }
    &Item {
      width: 250px;
      ::v-deep {
        .v3dp__datepicker {
          width: 100%;
          height: 38px;
        }
        .v3dp__input_wrapper {
          width: 100%;
          height: 38px;
          display: flex;
          align-items: center;
          position: relative;
          &:after {
            content: "";
            display: block;
            width: 16px;
            height: 16px;
            background-image: url("../assets/img/icons/calendar.svg");
            position: absolute;
            top: 10px;
            right: 40px;
            background-size: 16px;
          }
          input {
            width: calc(100% - 20px);
            height: 100%;
            border: 1px solid rgb(222, 226, 230);
            border-radius: 5px;
            padding: 0 16px;
            font-size: 16px;
          }
        }
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

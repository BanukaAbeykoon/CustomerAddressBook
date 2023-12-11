<template>
  <div>
    
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />

    <NavbarComponent />
    <div class="content">
      <div class="table-header">
        <button class="add-customer-btn" @click="showPopup">
          <i class="fas fa-plus"></i> <!-- Plus icon -->
        </button>
        <addNewCustomer
          @form-submitted="handleFormSubmitted"
          v-if="isPopupVisible"
          @close="closePopup"
        />
      </div>
    </div>

    <div class="content">
      <div class="table-header">
        <div class="summary">
          <h1>Hello User</h1>
          <div class="summary-item total-customers-bar">
            <p class="summary-label">Total Customers:</p>
            <p class="summary-value">{{ totalCustomers }}</p>
          </div>
          <div class="summary-item active-members-bar">
            <p class="summary-label">Active Members:</p>
            <p class="summary-value">{{ totalActiveMembers }}</p>
          </div>
          <div class="summary-item inactive-members-bar">
            <p class="summary-label">Inactive Members:</p>
            <p class="summary-value">{{ totalInactiveMembers }}</p>
          </div>
        </div>
        <h2 class="all-customers-text">All Customers</h2>
        <p class="active-members-text">Active Members</p>
      </div>
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Search..." />
        <label for="sort">Sort By:</label>
        <select v-model="selectedSort" id="sort">
          <option value="name">Name</option>
          <option value="company">Company</option>
          <option value="phoneNumber">Phone Number</option>
          <option value="email">Email</option>
          <option value="country">Country</option>
          <option value="status">Status</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Company</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Country</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(customer, index) in visibleCustomers"
            :key="index"
            @click="showCustomerDetails(customer)"
          >
            <td>{{ customer.name }}</td>
            <td>{{ customer.company }}</td>
            <td>{{ customer.phone }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.country }}</td>
            <td>
              <button
                :class="{
                  'active-btn': customer.status === 'Active',
                  'inactive-btn': customer.status === 'Inactive',
                }"
              >
                {{ customer.status }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-end">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a
              class="page-link"
              href="#"
              aria-label="Previous"
              @click.prevent="prevPage"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li
            v-for="pageNumber in totalPages"
            :key="pageNumber"
            class="page-item"
            :class="{ active: pageNumber === currentPage }"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="gotoPage(pageNumber)"
              >{{ pageNumber }}</a
            >
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          >
            <a
              class="page-link"
              href="#"
              aria-label="Next"
              @click.prevent="nextPage"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import NavbarComponent from "./NavbarComponent.vue";

import addNewCustomer from "@/components/addNewCustomer.vue";
const mock = new MockAdapter(axios);

const mockData = [
  {
    name: "John Doe",
    company: "ABC Inc.",
    phone: "123-456-7890",
    email: "john@example.com",
    country: "USA",
    status: "Active",
  },
  {
    name: "Jane Smith",
    company: "XYZ Corp.",
    phone: "987-654-3210",
    email: "jane@example.com",
    country: "Canada",
    status: "Inactive",
  },
  {
    name: "John Doe",
    company: "ABC Inc.",
    phone: "123-456-7890",
    email: "john@example.com",
    country: "USA",
    status: "Active",
  },
  {
    name: "Jane Smith",
    company: "XYZ Corp.",
    phone: "987-654-3210",
    email: "jane@example.com",
    country: "Canada",
    status: "Inactive",
  },
  {
    name: "John Doe",
    company: "ABC Inc.",
    phone: "123-456-7890",
    email: "john@example.com",
    country: "USA",
    status: "Active",
  },
  {
    name: "Jane Smith",
    company: "XYZ Corp.",
    phone: "987-654-3210",
    email: "jane@example.com",
    country: "Canada",
    status: "Inactive",
  },
  {
    name: "John Doe",
    company: "ABC Inc.",
    phone: "123-456-7890",
    email: "john@example.com",
    country: "USA",
    status: "Active",
  },
  {
    name: "Jane Smith",
    company: "XYZ Corp.",
    phone: "987-654-3210",
    email: "jane@example.com",
    country: "Canada",
    status: "Inactive",
  },
  {
    name: "John Doe",
    company: "ABC Inc.",
    phone: "123-456-7890",
    email: "john@example.com",
    country: "USA",
    status: "Active",
  },
  {
    name: "Jane Smith",
    company: "XYZ Corp.",
    phone: "987-654-3210",
    email: "jane@example.com",
    country: "Canada",
    status: "Inactive",
  },
  
];

mock.onGet("/api/customers").reply(200, mockData);

export default {
  components: {
    NavbarComponent,
    addNewCustomer,
  },
  data() {
    return {
      itemsPerPage: 5, 
      currentPage: 1,
      searchQuery: "",
      selectedSort: "name",
      customers: [],
      dialogVisible: false,
      isPopupVisible: false,
    };
  },
  mounted() {
    this.fetchCustomerData();
  },

  watch: {
  
    customers: {
      handler: 'updateTableData',
      deep: true,
    },
  },

  methods: {
    updateTableData() {
      this.customers = this.customers.sort((a, b) => {
        const aValue = a[this.selectedSort]?.toLowerCase();
        const bValue = b[this.selectedSort]?.toLowerCase();

        if (aValue && bValue) {
          return aValue.localeCompare(bValue);
        } else {
          return 0;
        }
      })
    },
    

    fetchCustomerData() {
      const apiUrl = "/api/customers";

      axios
        .get(apiUrl)
        .then((response) => {
          this.customers = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    closeModal() {
      
      this.selectedCustomer = null;
    },

    showCustomerDetails(customer) {
      
      this.selectedCustomer = customer;
    },

    handleFormSubmitted(formData) {
      
      console.log("Form submitted with data:", formData);
      formData.status = "Active";
      this.customers.push(formData);

      this.customers = this.customers.sort((a, b) => {
        const aValue = a[this.selectedSort]?.toLowerCase();
        const bValue = b[this.selectedSort]?.toLowerCase();

        if (aValue && bValue) {
          return aValue.localeCompare(bValue);
        } else {
          
          return 0;
        }
      });

      
      this.closePopup();
      alert("Data submitted successfully!");
    },

    showPopup() {
      this.isPopupVisible = true;
    },
    closePopup() {
      this.isPopupVisible = false;
    },

    saveCustomer() {
      this.dialogVisible = false;
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    gotoPage(pageNumber) {
      this.currentPage = pageNumber;
    },

    navigateToAddCustomer() {
      this.$router.push({ name: "addNew" });
    },
  },

  computed: {
    totalPages() {
      return Math.ceil(this.filteredCustomers.length / this.itemsPerPage);
    },
    visibleCustomers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      console.log("Start:", start, "End:", end);
      return this.filteredCustomers.slice(start, end);
    },

    totalCustomers() {
      return this.customers.length;
    },
    totalInactiveMembers() {
      return this.customers.filter((customer) => customer.status === "Inactive")
        .length;
    },
    totalActiveMembers() {
      return this.customers.filter((customer) => customer.status === "Active")
        .length;
    },
    filteredCustomers() {
      let filtered = this.customers.filter((customer) =>
        Object.values(customer).some((value) =>
          value.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      );
      // Sorting logic
      filtered = filtered.sort((a, b) => {
        const aValue = a[this.selectedSort]?.toLowerCase();
        const bValue = b[this.selectedSort]?.toLowerCase();

        if (aValue && bValue) {
          return aValue.localeCompare(bValue);
        } else {
          
          return 0;
        }
      });

      return filtered;
    },
  },
};
</script>

<style scoped>


.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.content {
  margin-left: 220px;
  
  padding: 40px;
}

.search-bar {
  text-align: right;
}

.active-btn {
  background-color: #8bff8b;
  /* light green */
  color: #006400;
  /* dark green */
  border: 1px solid #006400;
  /* dark green */
}

.inactive-btn {
  background-color: #ffb6b6;
  /* light red */
  color: #8b0000;
  /* dark red */
  border: 1px solid #8b0000;
  /* dark red */
}

.all-customers-text {
  color: #000;
  font-weight: bold;
  text-align: left;
}

.active-members-text {
  color: #008000;
  /* green color */
  text-align: left;
}

.summary {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.summary-item {
  background-color: #f2f2f2;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}

.active-members-bar {
  background-color: #8bff8b;
  /* light green */
  color: #006400;
  /* dark green */
}

.summary-label {
  font-weight: bold;
}

.summary-value {
  margin-top: 5px;
}

.add-customer-btn {
  float: right;
  background-color: #008000;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>

<template>
  <div class="popup">
    <div class="popup-content">
      <h2>Add Customer</h2>
      <form @submit.prevent="handleSubmit">
        <label for="name">Customer Name:</label>
        <input
          type="name"
          id="name"
          v-model="formData.name"
          required
        />

        <label for="company">Company:</label>
        <input
          type="company"
          id="company"
          v-model="formData.company"
          required
        />

        <label for="phone">Phone Number:</label>
        <input type="phone" id="phone" v-model="formData.phone" required />

        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" required />

        <label for="country">Country:</label>
        <input
          type="country"
          id="country"
          v-model="formData.country"
          required
        />

        <label for="addressDetails">Address Details:</label>
        <div v-for="(address, index) in formData.addressDetails" :key="index">
          <label for="number">Number:</label>
          <input type="number" :id="'number' + index" v-model="address.number" required />

          <label for="street">Street:</label>
         <input type="street" :id="'street' + index" v-model="address.street" required />

          <label for="city">City,State:</label>
          <input type="city" :id="'city' + index" v-model="address.city" required />
        </div>

        <button type="button" @click="removeAddress(index)" class="remove-address-btn">Remove</button>

        <button type="button" @click="addAddress" class="add-address-btn">Add Address</button>

        <button @click="handleSubmit" type="submit" class="submit-btn">Submit</button>
      </form>
      <br/>
      <button @click="closePopup">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "",
        company: "",
        email: "",
        phone: "",
        country:"",
        addressDetails: [
          // Initial address details
          { number: "", street: "", city: "" },
        ],
      },
    };
  },
  methods: {
    removeAddress(index) {
      // Remove the address at the specified index
      this.formData.addressDetails.splice(index, 1);
    },

    addAddress() {
      // Add a new empty address to the array
      this.formData.addressDetails.push({ number: "", street: "", city: "" });
    },

    handleSubmit() {
      // Handle form submission logic, e.g., emit an event with the form data
      this.$emit("form-submitted", this.formData);
      this.closePopup();
    },
    closePopup() {
      // Close the popup
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
/* Add your styles for the popup here */
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

/* Additional styles for form layout */
form {
  display: grid;
  gap: 10px;
}

.customer-form {
  max-width: 400px; /* Adjust the maximum width as needed */
  margin: auto;
}

/* Button styles */
.submit-btn,
.add-address-btn,
.remove-address-btn,
.close-btn {
  background-color: #62f562;
  /* Green color */
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  width:100px;
  display: inline-block;
  margin:auto;
  
}

.add-address-btn,
.remove-address-btn,
.close-btn {
  margin-top: 10px;
}
</style>

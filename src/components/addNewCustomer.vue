<template>
  <div class="popup" ref="popup">
    
    <div class="popup-content">
      <h2>Add Customer</h2>
      <form @submit.prevent="handleSubmit">
        <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Customer Name <span class="text-danger">*</span></label>
                <input type="text" v-model="formData.name" class="form-control form-control-lg">
            </div>

        <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Company <span class="text-danger">*</span></label>
                <input type="text" v-model="formData.company" class="form-control form-control-lg">
            </div>

            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Phone Number <span class="text-danger">*</span></label>
                <input type="text" v-model="formData.phone" class="form-control form-control-lg">
            </div>

        <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Email <span class="text-danger">*</span></label>
                <input type="email" v-model="formData.email" class="form-control form-control-lg">
            </div>

            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Country <span class="text-danger">*</span></label>
                <input type="text"  v-model="formData.country" class="form-control form-control-lg">
            </div>

        <label for="addressDetails">Address Details:</label>
        <div v-for="(address, index) in formData.addressDetails" :key="index">
          <label class="col-form-label col-form-label-lg">Number <span class="text-danger">*</span></label>
          <input type="number" :id="'number' + index" v-model="address.number" required />

          <label class="col-form-label col-form-label-lg">Street <span class="text-danger">*</span></label>
         <input type="street" :id="'street' + index" v-model="address.street" required />

         <label class="col-form-label col-form-label-lg">City,State <span class="text-danger">*</span></label>
          <input type="city" :id="'city' + index" v-model="address.city" required />
        </div>

        <div class="col-12 form-group text-center">
        <button type="button" @click="removeAddress(index)" class="remove-address-btn">Remove</button>
      </div>

        <div class="col-12 form-group text-center">
        <button type="button" @click="addAddress" class="add-address-btn" >Add Address</button>
        </div>
        
        <div class="col-12 form-group text-center">
                <button  class="submit-btn" @click="handleSubmit" type="submit" >Submit</button>
            </div>
      </form>
      <br/>
      <button class="closs-btn" @click="closePopup">Close</button>
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
          
          { number: "", street: "", city: "" },
        ],
      },
    };
  },

  watch: {
    selectedCustomer(newCustomer) {
      if (newCustomer) {
        // Assuming there's only one address
        const addressDetails = newCustomer.addressDetails[0];
        if (addressDetails) {
          this.showAddressDetails(addressDetails);
        }
      }
    },
  },


  methods: {

    showAddressDetails(addressDetails) {
      // Set the address details in the form data
      this.formData.phone = addressDetails.number || "";
      this.formData.email = addressDetails.street || "";
      this.formData.country = addressDetails.city || "";
    },


    removeAddress(index) {
      
      this.formData.addressDetails.splice(index, 1);
    },

    addAddress() {
      
      this.formData.addressDetails.push({ number: "", street: "", city: "" });
    },

    handleSubmit() {
      
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

.popup {
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

.popup-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}


form {
  display: grid;
  gap: 10px;
}

.customer-form {
  max-width: 400px; 
  margin: auto;
}

/* Button styles */

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

.add-address-btn,
.remove-address-btn,
.submit-btn
.close-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  width: 100px;
  display: inline-block;
  margin: auto;
}

.add-address-btn {
  background-color: #007bff; /* Blue color */
  color: #fff;
}

.remove-address-btn {
  background-color: #dc3545; /* Red color */
  color: #fff;
}

.close-btn {
  background-color: #28a745; /* Green color */
  color: #fff;
}
</style>

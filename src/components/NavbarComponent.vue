<template>
  <div class="left-sidebar">
    <!-- Dashboard Topic -->
    <div class="dashboard-topic">
      <span class="icon">🚀</span>
      <strong style="color: #1d1d1e;">Dashboard</strong>
    </div>

    <!-- Navigation Buttons -->
    <ul class="navigation-buttons">
      <li :class="{ active: activeTab === 'product' }" @click="setActiveTab('product')">
        <span class="icon">📦</span> Product
      </li>
      <li :class="{ active: activeTab === 'customer' }" @click="setActiveTab('customer')">
        <span class="icon">👤</span> Customers
      </li>
      <li :class="{ active: activeTab === 'income' }" @click="setActiveTab('income')">
        <span class="icon">💰</span> Income
      </li>
      <li :class="{ active: activeTab === 'promote' }" @click="setActiveTab('promote')">
        <span class="icon">🚀</span> Promote
      </li>
      <li :class="{ active: activeTab === 'help' }" @click="setActiveTab('help')">
        <span class="icon">❓</span> Help
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'customer'
    };
  },
  methods: {
    setActiveTab(tabName) {
      this.activeTab = tabName;
      
    }
  }
};
</script>

<style scoped>

.left-sidebar {
  width: 200px;
  height: 100%;

  color: #d4d6da;
  padding: 20px;
  position: fixed; 
  top: 0;
  left: 0;
  bottom: 0;
}

.dashboard-topic {
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #f00; /* Bold block color text */
  margin-bottom: 20px;
}

.dashboard-topic .icon {
  margin-right: 10px;
}

.navigation-buttons {
  list-style-type: none;
  padding: 0;
}

.navigation-buttons li {
cursor: pointer;
padding: 10px;
transition: background-color 0.3s;
display: flex;
align-items: center;
border-radius: 5px; 
position: relative; 
}

.navigation-buttons li:hover {
  background-color: #4f2ec8; /* Purple color for active button */
  border-radius: 5px;
}

.navigation-buttons li.active {
  background-color: #5a32eb; /* Purple color for active button */
  border-radius: 5px;
}

.navigation-buttons .icon {
  margin-right: 10px;
}
</style>
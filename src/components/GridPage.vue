<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <h2 class="text-center my-5">Grid of Vehicles</h2>
        <h2 class="text-center my-5 text-warning" v-if="!editSave">Editing mode!!</h2>  
          <input type="text" v-model="search" placeholder="Search filter" class="form-control">   
          <button @click="showInputsAndEnableEditing" v-if="editSave" class="btn btn-primary">Edit</button> &nbsp; 
          <button @click="showInputsAndEnableEditing" v-else class="btn btn-success">Save</button>
          <span class="clearfix"></span>
        <div class="table-responsive-md my-5">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Vehicle name</th>
                <th>Vehicle type</th>
                <th>Model</th>
                <th>License plate number</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(vehicle, index) in vehiclesList" :key="index">
                <td>{{ vehicle.vehicleName }} <br />
                  <input type="text" v-model="vehicle.vehicleName" v-bind:disabled="disabled" v-if="showInputs" class="form-control"/>
                </td>
                <td>{{ vehicle.vehicleType }} <br />
                  <input type="text" v-model="vehicle.vehicleType" v-bind:disabled="disabled" v-if="showInputs" class="form-control"/>
                </td>
                <td>{{ vehicle.model }} <br />
                  <input type="text" v-model="vehicle.model" v-bind:disabled="disabled" v-if="showInputs" class="form-control"/>
                </td>
                <td>{{ vehicle.plateNumber}} <br />
                  <input type="text" v-model="vehicle.plateNumber" v-bind:disabled="disabled" v-if="showInputs" class="form-control"/>
                </td>
                <button @click='deleteTableRow(index)' class="mt-2 btn btn-sm btn-danger">x</button> 
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  </div>
  </div>
</template>

<script>


export default {
  name: 'GridPage',
  data() {
    return {
      vehicles: [],
      search: '',
      disabled: true,
      showInputs: false,
      editSave: true
    };
},

 computed: {
    vehiclesList() {
      return this.vehicles.filter(vehicle => {
        return vehicle.vehicleName.toLowerCase().includes(this.search.toLowerCase())
         || vehicle.vehicleType.toLowerCase().includes(this.search.toLowerCase())
         || vehicle.model.toLowerCase().includes(this.search.toLowerCase())
         || vehicle.plateNumber.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },

  methods:{
    deleteTableRow: function (idx) { 
      this.vehicles.splice(idx, 1);      
   },

   showInputsAndEnableEditing(){
     this.disabled = !this.disabled;
     this.showInputs = !this.showInputs;
     this.editSave = !this.editSave;
   }
  },

  mounted(){
      fetch('http://localhost:3000/vehicles')
      .then(res => res.json())
      .then(data => this.vehicles = data)
      .catch(err => console.log(err.message))
  }

}
</script>

<style scoped>

button{
  cursor: pointer;
  float: right;
}

input{
  width: 50%!important;
  float: left;
}

</style>

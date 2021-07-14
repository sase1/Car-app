<template>
  <div class="container">
   <div class="row">
     <div class="col-md-6 offset-md-3">
     <form action="" v-on:submit.prevent="validate">
        <div class="form-group">
          <label>Vehicle name*:</label>
          <input 
          type="text" 
          class="form-control"
          v-model="vehicleName" :maxlength="maxVehicleNameInputCharacters"
          v-bind:class="{ 'is-valid': validation.valid.vehicleName, 'is-invalid': validation.invalid.vehicleName }" 
          v-on:focus="clearValidation('vehicleName')"
          > 
           <div class="valid-feedback" v-if="validation.valid.vehicleName">{{ validation.valid.vehicleName }}</div>
           <div class="invalid-feedback" v-if="validation.invalid.vehicleName">{{ validation.invalid.vehicleName }}</div>
          <span v-text="(maxVehicleNameInputCharacters - vehicleName.length)"></span> Characters Remaining
        </div>

        <div class="form-group">
          <label>Vehicle Type*:</label>
          <select class="form-control" v-model="selectedTypeCar" 
            v-bind:class="{ 'is-valid': validation.valid.selectedTypeCar, 'is-invalid': validation.invalid.selectedTypeCar }" 
            v-on:focus="clearValidation('selectedTypeCar')">
            <option v-for="(vehicleType, index) in vehicleTypes" :key="index" :value="{ id: vehicleType.id, type: vehicleType.type }">{{vehicleType.type}}</option>
          </select>
           <div class="valid-feedback" v-if="validation.valid.selectedTypeCar">{{ validation.valid.selectedTypeCar }}</div>
           <div class="invalid-feedback" v-if="validation.invalid.selectedTypeCar">{{ validation.invalid.selectedTypeCar }}</div>
        </div>

        <div class="form-group">
          <label>Vehicle Model:</label>
          <input 
          type="text" 
          class="form-control"  
          placeholder="Type your car" 
          v-model="vehicleModel" 
          @blur="toggle = false" 
          @focus="toggle = true"
          >
          <div class="results mt-3 ml-3" v-if="toggle">
            <div class="result" v-for="vehicleModel in newVehicleModels" :key='vehicleModel'>
              <span @click="selectResult(vehicleModel)" @mousedown.prevent>
                {{ vehicleModel.car }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label>Vehicle License Number*:</label>
          <input 
          type="text" 
          class="form-control"  
          v-model="vehicleLicenseNumber" 
          placeholder="AA-1111-BB"
          v-bind:class="{ 'is-valid': validation.valid.vehicleLicenseNumber, 'is-invalid': validation.invalid.vehicleLicenseNumber }" 
            v-on:focus="clearValidation('vehicleLicenseNumber')"/> 
           <div class="valid-feedback" v-if="validation.valid.vehicleLicenseNumber">{{ validation.valid.vehicleLicenseNumber }}</div>
           <div class="invalid-feedback" v-if="validation.invalid.vehicleLicenseNumber">{{ validation.invalid.vehicleLicenseNumber }}</div>
        </div>

        <button 
        type="submit" 
        class="btn btn-primary" 
       >Submit</button>
      </form>
     </div>
   </div>
  </div>


  <!-- The Modal -->
  <div class="modal modal-active" id="myModal" v-if="showModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Form data info display</h4>
          <button type="button" class="close" data-dismiss="modal" @click="closeModal">&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
          <div>
            <h4 class="float-left">Vehicle name: </h4><p class="float-right">{{vehicleName}}</p>
            <span class="clearfix"></span>
          </div>

           <div>
            <h4 class="float-left">Vehicle type: </h4><p class="float-right">{{selectedTypeCar.type}}</p>
            <span class="clearfix"></span>
          </div>

           <div>
            <h4 class="float-left">Vehicle model: </h4>
            <p class="float-right" v-if='vehicleModel.length < 1'>Model was not selected</p>
            <p class="float-right" v-else>{{vehicleModel}}</p>
            <span class="clearfix"></span>
          </div>

           <div>
            <h4 class="float-left">vehicle license number:</h4><p class="float-right">{{vehicleLicenseNumber}}</p>
            <span class="clearfix"></span>
          </div>

        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal" @click="closeModal">Close</button>
        </div>
        
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'FormPage',
  data(){
    return{
      vehicleModel: '',
      selectedTypeCar: 0,
      toggle: false,
      maxVehicleNameInputCharacters: 50,
      vehicleLicenseNumber: '',
      vehicleName: '',
      showModal: false,
      validation: {
      invalid: {
      },
      valid: {
      },
    },
      vehicleTypes: [
        {type: 'Car', id: 1},
        {type: 'Van', id: 2},
        {type: 'Truck', id: 3},
        {type: 'Container', id: 4},
        {type: 'Trailer', id: 5},
        {type: 'Dumper', id: 6},

      ],
      vehicleModels: [
          {car: 'Audi'},
          {car: 'BMW'},
          {car: 'Citroen'},
          {car: 'Honda'},
          {car: 'Hyundai'},
          {car: 'Mercedes'},
          {car: 'Nissan'},
          {car: 'Opel'},
          {car: 'Suzuki'},
          {car: 'Toyota'},
          {car: 'Volkswagen'}
      ],
      newVehicleModels: [],
      
    }
  },
  methods: {
    selectResult(vehicleModel) {
      this.vehicleModel = vehicleModel.car;
    },

    validate(){
      if (!this.vehicleName) {
        this.validation.invalid.vehicleName = 'Please enter your car name.';
      } else if (this.vehicleName.length < 3) {
        this.validation.invalid.vehicleName = 'Car name should have min. 3 characters.';
      }  else {
        this.validation.valid.vehicleName = 'Car name is OK.';
      }


      if (!this.selectedTypeCar) {
        this.validation.invalid.selectedTypeCar = 'Please select your car type.';
      } else {
        this.validation.valid.selectedTypeCar = 'Car type is selected.';
      }

      if (!this.vehicleLicenseNumber) {
        this.validation.invalid.vehicleLicenseNumber = 'Please enter your car license plate.';
      } else if (this.vehicleLicenseNumber.length < 10) {
        this.validation.invalid.vehicleLicenseNumber = 'Car license plate not OK, please re-enter again in following format AA-1234-BB.';
      } else {
        this.validation.valid.vehicleLicenseNumber = 'Car license plate is OK.';
      }

      this.openModal();
    },

    openModal(){
      if( this.validation.valid.vehicleLicenseNumber && this.validation.valid.selectedTypeCar && this.validation.valid.vehicleName){
        this.showModal = true;
      }
    },

    closeModal(){
        window.location.reload();
      },

     clearValidation: function(field) {
      this.validation.valid[field] = '';
      this.validation.invalid[field] = '';      
    }
  },

   watch: {
    vehicleModel(val) {
      this.newVehicleModels = [];
      this.vehicleModels.forEach(element => {
        if(element.car.includes(val) && val != ""){
          this.newVehicleModels.push(element);
        }
      });
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.results{
  color: blue;
  cursor: pointer;
}


.modal-active{
	display:block;
}
</style>

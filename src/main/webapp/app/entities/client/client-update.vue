<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="libraryApp.client.home.createOrEditLabel" v-text="$t('libraryApp.client.home.createOrEditLabel')">Create or edit a Client</h2>
                <div>
                    <div class="form-group" v-if="client.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="client.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('libraryApp.client.firstName')" for="client-firstName">First Name</label>
                        <input type="text" class="form-control" name="firstName" id="client-firstName"
                            :class="{'valid': !$v.client.firstName.$invalid, 'invalid': $v.client.firstName.$invalid }" v-model="$v.client.firstName.$model"  required/>
                        <div v-if="$v.client.firstName.$anyDirty && $v.client.firstName.$invalid">
                            <small class="form-text text-danger" v-if="!$v.client.firstName.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.client.firstName.maxLength" v-text="$t('entity.validation.maxlength', {max: 50})">
                                This field cannot be longer than 50 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('libraryApp.client.lastName')" for="client-lastName">Last Name</label>
                        <input type="text" class="form-control" name="lastName" id="client-lastName"
                            :class="{'valid': !$v.client.lastName.$invalid, 'invalid': $v.client.lastName.$invalid }" v-model="$v.client.lastName.$model"  required/>
                        <div v-if="$v.client.lastName.$anyDirty && $v.client.lastName.$invalid">
                            <small class="form-text text-danger" v-if="!$v.client.lastName.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.client.lastName.maxLength" v-text="$t('entity.validation.maxlength', {max: 50})">
                                This field cannot be longer than 50 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('libraryApp.client.email')" for="client-email">Email</label>
                        <input type="text" class="form-control" name="email" id="client-email"
                            :class="{'valid': !$v.client.email.$invalid, 'invalid': $v.client.email.$invalid }" v-model="$v.client.email.$model" />
                        <div v-if="$v.client.email.$anyDirty && $v.client.email.$invalid">
                            <small class="form-text text-danger" v-if="!$v.client.email.maxLength" v-text="$t('entity.validation.maxlength', {max: 50})">
                                This field cannot be longer than 50 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('libraryApp.client.address')" for="client-address">Address</label>
                        <input type="text" class="form-control" name="address" id="client-address"
                            :class="{'valid': !$v.client.address.$invalid, 'invalid': $v.client.address.$invalid }" v-model="$v.client.address.$model" />
                        <div v-if="$v.client.address.$anyDirty && $v.client.address.$invalid">
                            <small class="form-text text-danger" v-if="!$v.client.address.maxLength" v-text="$t('entity.validation.maxlength', {max: 50})">
                                This field cannot be longer than 50 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('libraryApp.client.phone')" for="client-phone">Phone</label>
                        <input type="text" class="form-control" name="phone" id="client-phone"
                            :class="{'valid': !$v.client.phone.$invalid, 'invalid': $v.client.phone.$invalid }" v-model="$v.client.phone.$model" />
                        <div v-if="$v.client.phone.$anyDirty && $v.client.phone.$invalid">
                            <small class="form-text text-danger" v-if="!$v.client.phone.maxLength" v-text="$t('entity.validation.maxlength', {max: 20})">
                                This field cannot be longer than 20 characters.
                            </small>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.client.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./client-update.component.ts">
</script>

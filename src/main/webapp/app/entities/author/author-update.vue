<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="libraryApp.author.home.createOrEditLabel" v-text="$t('libraryApp.author.home.createOrEditLabel')">Create or edit a Author</h2>
                <div>
                    <div class="form-group" v-if="author.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="author.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('libraryApp.author.firstName')" for="author-firstName">First Name</label>
                        <input type="text" class="form-control" name="firstName" id="author-firstName"
                            :class="{'valid': !$v.author.firstName.$invalid, 'invalid': $v.author.firstName.$invalid }" v-model="$v.author.firstName.$model"  required/>
                        <div v-if="$v.author.firstName.$anyDirty && $v.author.firstName.$invalid">
                            <small class="form-text text-danger" v-if="!$v.author.firstName.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.author.firstName.maxLength" v-text="$t('entity.validation.maxlength', {max: 50})">
                                This field cannot be longer than 50 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('libraryApp.author.lastName')" for="author-lastName">Last Name</label>
                        <input type="text" class="form-control" name="lastName" id="author-lastName"
                            :class="{'valid': !$v.author.lastName.$invalid, 'invalid': $v.author.lastName.$invalid }" v-model="$v.author.lastName.$model"  required/>
                        <div v-if="$v.author.lastName.$anyDirty && $v.author.lastName.$invalid">
                            <small class="form-text text-danger" v-if="!$v.author.lastName.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.author.lastName.maxLength" v-text="$t('entity.validation.maxlength', {max: 50})">
                                This field cannot be longer than 50 characters.
                            </small>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.author.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./author-update.component.ts">
</script>

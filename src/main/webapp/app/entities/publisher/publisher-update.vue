<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="libraryApp.publisher.home.createOrEditLabel" v-text="$t('libraryApp.publisher.home.createOrEditLabel')">Create or edit a Publisher</h2>
                <div>
                    <div class="form-group" v-if="publisher.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="publisher.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('libraryApp.publisher.name')" for="publisher-name">Name</label>
                        <input type="text" class="form-control" name="name" id="publisher-name"
                            :class="{'valid': !$v.publisher.name.$invalid, 'invalid': $v.publisher.name.$invalid }" v-model="$v.publisher.name.$model"  required/>
                        <div v-if="$v.publisher.name.$anyDirty && $v.publisher.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.publisher.name.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.publisher.name.maxLength" v-text="$t('entity.validation.maxlength', {max: 100})">
                                This field cannot be longer than 100 characters.
                            </small>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.publisher.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./publisher-update.component.ts">
</script>

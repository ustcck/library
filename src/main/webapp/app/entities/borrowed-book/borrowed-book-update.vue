<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="libraryApp.borrowedBook.home.createOrEditLabel" v-text="$t('libraryApp.borrowedBook.home.createOrEditLabel')">Create or edit a BorrowedBook</h2>
                <div>
                    <div class="form-group" v-if="borrowedBook.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="borrowedBook.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('libraryApp.borrowedBook.borrowDate')" for="borrowed-book-borrowDate">Borrow Date</label>
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-form-datepicker
                                    aria-controls="borrowed-book-borrowDate"
                                    v-model="$v.borrowedBook.borrowDate.$model"
                                    name="borrowDate"
                                    class="form-control"
                                    :locale="currentLanguage"
                                    button-only
                                    today-button
                                    reset-button
                                    close-button
                                >
                                </b-form-datepicker>
                            </b-input-group-prepend>
                            <b-form-input id="borrowed-book-borrowDate" type="text" class="form-control" name="borrowDate"  :class="{'valid': !$v.borrowedBook.borrowDate.$invalid, 'invalid': $v.borrowedBook.borrowDate.$invalid }"
                            v-model="$v.borrowedBook.borrowDate.$model"  />
                        </b-input-group>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('libraryApp.borrowedBook.book')" for="borrowed-book-book">Book</label>
                        <select class="form-control" id="borrowed-book-book" name="book" v-model="borrowedBook.book">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="borrowedBook.book && bookOption.id === borrowedBook.book.id ? borrowedBook.book : bookOption" v-for="bookOption in books" :key="bookOption.id">{{bookOption.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('libraryApp.borrowedBook.client')" for="borrowed-book-client">Client</label>
                        <select class="form-control" id="borrowed-book-client" name="client" v-model="borrowedBook.client">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="borrowedBook.client && clientOption.id === borrowedBook.client.id ? borrowedBook.client : clientOption" v-for="clientOption in clients" :key="clientOption.id">{{clientOption.email}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.borrowedBook.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./borrowed-book-update.component.ts">
</script>

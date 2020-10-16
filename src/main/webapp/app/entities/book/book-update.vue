<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="libraryApp.book.home.createOrEditLabel" v-text="$t('libraryApp.book.home.createOrEditLabel')">Create or edit a Book</h2>
                <div>
                    <div class="form-group" v-if="book.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="book.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('libraryApp.book.isbn')" for="book-isbn">Isbn</label>
                        <input type="text" class="form-control" name="isbn" id="book-isbn"
                            :class="{'valid': !$v.book.isbn.$invalid, 'invalid': $v.book.isbn.$invalid }" v-model="$v.book.isbn.$model"  required/>
                        <div v-if="$v.book.isbn.$anyDirty && $v.book.isbn.$invalid">
                            <small class="form-text text-danger" v-if="!$v.book.isbn.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.book.isbn.minLength" v-text="$t('entity.validation.minlength', {min: 5})">
                                This field is required to be at least 5 characters.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.book.isbn.maxLength" v-text="$t('entity.validation.maxlength', {max: 13})">
                                This field cannot be longer than 13 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('libraryApp.book.name')" for="book-name">Name</label>
                        <input type="text" class="form-control" name="name" id="book-name"
                            :class="{'valid': !$v.book.name.$invalid, 'invalid': $v.book.name.$invalid }" v-model="$v.book.name.$model"  required/>
                        <div v-if="$v.book.name.$anyDirty && $v.book.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.book.name.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.book.name.maxLength" v-text="$t('entity.validation.maxlength', {max: 100})">
                                This field cannot be longer than 100 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('libraryApp.book.publishYear')" for="book-publishYear">Publish Year</label>
                        <input type="text" class="form-control" name="publishYear" id="book-publishYear"
                            :class="{'valid': !$v.book.publishYear.$invalid, 'invalid': $v.book.publishYear.$invalid }" v-model="$v.book.publishYear.$model"  required/>
                        <div v-if="$v.book.publishYear.$anyDirty && $v.book.publishYear.$invalid">
                            <small class="form-text text-danger" v-if="!$v.book.publishYear.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.book.publishYear.minLength" v-text="$t('entity.validation.minlength', {min: 4})">
                                This field is required to be at least 4 characters.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.book.publishYear.maxLength" v-text="$t('entity.validation.maxlength', {max: 50})">
                                This field cannot be longer than 50 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('libraryApp.book.copies')" for="book-copies">Copies</label>
                        <input type="number" class="form-control" name="copies" id="book-copies"
                            :class="{'valid': !$v.book.copies.$invalid, 'invalid': $v.book.copies.$invalid }" v-model.number="$v.book.copies.$model"  required/>
                        <div v-if="$v.book.copies.$anyDirty && $v.book.copies.$invalid">
                            <small class="form-text text-danger" v-if="!$v.book.copies.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.book.copies.numeric" v-text="$t('entity.validation.number')">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('libraryApp.book.cover')" for="book-cover">Cover</label>
                        <div>
                            <img v-bind:src="'data:' + book.coverContentType + ';base64,' + book.cover" style="max-height: 100px;" v-if="book.cover" alt="book image"/>
                            <div v-if="book.cover" class="form-text text-danger clearfix">
                                <span class="pull-left">{{book.coverContentType}}, {{byteSize(book.cover)}}</span>
                                <button type="button" v-on:click="clearInputImage('cover', 'coverContentType', 'file_cover')" class="btn btn-secondary btn-xs pull-right">
                                    <font-awesome-icon icon="times"></font-awesome-icon>
                                </button>
                            </div>
                            <input type="file" ref="file_cover" id="file_cover" v-on:change="setFileData($event, book, 'cover', true)" accept="image/*" v-text="$t('entity.action.addimage')"/>
                        </div>
                        <input type="hidden" class="form-control" name="cover" id="book-cover"
                            :class="{'valid': !$v.book.cover.$invalid, 'invalid': $v.book.cover.$invalid }" v-model="$v.book.cover.$model" />
                        <input type="hidden" class="form-control" name="coverContentType" id="book-coverContentType"
                            v-model="book.coverContentType" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('libraryApp.book.publisher')" for="book-publisher">Publisher</label>
                        <select class="form-control" id="book-publisher" name="publisher" v-model="book.publisher">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="book.publisher && publisherOption.id === book.publisher.id ? book.publisher : publisherOption" v-for="publisherOption in publishers" :key="publisherOption.id">{{publisherOption.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label v-text="$t('libraryApp.book.author')" for="book-author">Author</label>
                        <select class="form-control" id="book-author" multiple name="author" v-model="book.authors">
                            <option v-bind:value="getSelected(book.authors, authorOption)" v-for="authorOption in authors" :key="authorOption.id">{{authorOption.firstName}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.book.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./book-update.component.ts">
</script>

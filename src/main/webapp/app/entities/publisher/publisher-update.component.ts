import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';
import { IPublisher, Publisher } from '@/shared/model/publisher.model';
import PublisherService from './publisher.service';

const validations: any = {
  publisher: {
    name: {
      required,
      maxLength: maxLength(100),
    },
  },
};

@Component({
  validations,
})
export default class PublisherUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('publisherService') private publisherService: () => PublisherService;
  public publisher: IPublisher = new Publisher();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.publisherId) {
        vm.retrievePublisher(to.params.publisherId);
      }
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.publisher.id) {
      this.publisherService()
        .update(this.publisher)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('libraryApp.publisher.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.publisherService()
        .create(this.publisher)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('libraryApp.publisher.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrievePublisher(publisherId): void {
    this.publisherService()
      .find(publisherId)
      .then(res => {
        this.publisher = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}

import { Component, OnInit, ElementRef } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IProduct, Product } from 'app/shared/model/product.model';
import { ProductService } from './product.service';
import { IProductCategory } from 'app/shared/model/product-category.model';
import { ProductCategoryService } from 'app/entities/product-category/product-category.service';

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent implements OnInit {
  isSaving: boolean;

  productcategories: IProductCategory[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
    price: [null, [Validators.required, Validators.min(0)]],
    size: [null, [Validators.required]],
    image: [],
    imageContentType: [],
    productCategory: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected productService: ProductService,
    protected productCategoryService: ProductCategoryService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ product }) => {
      this.updateForm(product);
    });
    this.productCategoryService
      .query()
      .subscribe(
        (res: HttpResponse<IProductCategory[]>) => (this.productcategories = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(product: IProduct) {
    this.editForm.patchValue({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      size: product.size,
      image: product.image,
      imageContentType: product.imageContentType,
      productCategory: product.productCategory
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file: File = event.target.files[0];
        if (isImage && !file.type.startsWith('image/')) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      // eslint-disable-next-line no-console
      () => console.log('blob added'), // success
      this.onError
    );
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string) {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const product = this.createFromForm();
    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  private createFromForm(): IProduct {
    return {
      ...new Product(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
      price: this.editForm.get(['price']).value,
      size: this.editForm.get(['size']).value,
      imageContentType: this.editForm.get(['imageContentType']).value,
      image: this.editForm.get(['image']).value,
      productCategory: this.editForm.get(['productCategory']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackProductCategoryById(index: number, item: IProductCategory) {
    return item.id;
  }
}

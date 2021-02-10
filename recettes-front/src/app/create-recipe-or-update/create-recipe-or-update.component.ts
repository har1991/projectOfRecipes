import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { ImageDto } from '../imageDto';
import { ImagesService } from '../images.service';
import { RecipeService } from '../recipe.service';
import { RecipeDto } from '../recipes-list/recipeDto/recipeDto';
import { TagService } from '../tag.service';
import { TagDto } from '../tagDto/tagDto';
import { TagGetDto } from '../tagDto/TagGetDto';
import { ImageSnippet } from './imagsnippet';
 
@Component({
  selector: 'app-create-recipe-or-update',
  templateUrl: './create-recipe-or-update.component.html',
  styleUrls: ['./create-recipe-or-update.component.css']
})
export class CreateRecipeOrUpdateComponent implements OnInit {

  public recipe_form: FormGroup ;
  public recipe  : RecipeDto;
  selectedFile: ImageSnippet;
  form_data : FormData 
  file : File ;
  user_id : number; 
  tags_to_get : {
    tag :TagGetDto , 
    selected : boolean}[];


  constructor( private  recipe_service: RecipeService , 
    private tag_service : TagService ,
    private image_service : ImagesService ,
    private form_builder: FormBuilder, 
    private routeur: Router) {
      this.recipe_form= this.form_builder.group({
        name : form_builder.control('',[Validators.required]),
        description : form_builder.control('',[Validators.required]),
        time_preparation : form_builder.control('',[Validators.required]),
        time_cocking : form_builder.control('',[Validators.required]),
        //fileSource: new FormControl('', [Validators.required]),
        file: new FormControl('', [Validators.required]), 
        primary : new FormControl(0, [Validators.required]), 
        photos: this.form_builder.array([]),
        tags: this.form_builder.array([])  
     }),
     this.user_id = Number(localStorage.getItem('id')) ;
    this.tag_service.get_tags().subscribe((data)=> this.tags_to_get=data.map((tag)=>
      ({
        tag ,
        selected : false
      })))
     }

  ngOnInit(): void {
  }
  get tags():FormArray{
    return this.recipe_form.get('tags') as FormArray
  }

  get photos(): FormArray{
    return this.recipe_form.get('photos')as FormArray

  }
  
  add_recipe(){
    
    //console.log("Event is here" , this.recipe_form.value) ;
    
      if(this.recipe_form.valid){
       
        console.log("valide");
        this.recipe_form.value.name.toLowerCase()
        this.add_photo()
        .pipe(
          switchMap((images :ImageDto[] )=>{
            
            let {photos, primary , ...values}= this.recipe_form.value
            this.recipe = {
              ...values,
              id:0 , 
              image_ids: images.map((image)=> image.id ),
             
              primary_photo_id: images[primary].id
            }
            
            this.recipe.user_id = this.user_id ;
            this.recipe.name = this.recipe.name.toLowerCase()
            console.log(this.recipe)
            return this.recipe_service.add_recipe(this.recipe);
          })
        )
        .subscribe();
      }
      else{
        console.log("pas valide")
  
      }
      
  }

  createItem(data): FormGroup {
    
    return this.form_builder.group(data);
}
  onFileChange(event) {
  let files = event.target.files
    if (event.target.files.length > 0) {
      
      let reader = new FileReader();
      for (let file of files) {
      reader.onload = (e: any) => {
        
       
          this.photos.push(this.createItem({
              file,
              url: e.target.result  //Base64 string for preview image
          }));
      }
      
      reader.readAsDataURL(file);
    }

    }
   
  }
  removePhoto(i){
		this.photos.removeAt(i);
  }
  add_tag(tag_to_add : {
    tag : TagGetDto,
    selected : boolean
  }){
    const {tag,selected} = tag_to_add ;
    //console.log(tag.tag.id)
    
    // console.log(this.recipe_form.value.tags.some((tag_id)=>
    // tag_id.id !== tag.tag.id ));
    
    if (!selected){
        this.tags.push(this.form_builder.control({
          id: tag.id 
        }))
        console.log("we can  add")
    }
    else {
      this.tags.removeAt(this.recipe_form.value.tags.findIndex((t)=>
      t.id == tag.id))
    }
    tag_to_add.selected = ! selected ;
    
    console.log(this.recipe_form.value.tags)
  }

    add_photo(){
      const formData = new FormData();
      
      this.recipe_form.get('photos').value.forEach((element,i) => {
        formData.append('file', element.file)
      });
     
      console.log("formData",this.recipe_form.get('photos').value);
      console.log(formData.getAll('file'));
    
      
      return this.image_service.upload_image(formData);

        //formData.append('file', this.recipe_form.get('fileSource').value);
      //this.form_data = formData ;
      
      //console.log("this.file" , this.form_data)
     
     
      
      /*reader.addEventListener('load', (event: any) => {
  
        this.selectedFile = new ImageSnippet(event.target.result, this.file);
  
        this.image_service.upload_image(this.selectedFile.file).subscribe(
          (res) => {
          
          },
          (err) => {
          
          })
      });*/
  
      //reader.readAsDataURL(this.file);
      
    }
    


   /*
      const file = event.target.files[0];
      this.recipe_form.patchValue({
        fileSource : file
      });
    */
     
      /*
      const file = event.target.files[0];
      this.recipe_form.patchValue({
        fileSource : file
      });*/ 
      
    
    
    }
  


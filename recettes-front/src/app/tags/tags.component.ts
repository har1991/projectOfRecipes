import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes-list/recipeDto/recipe';
import { TagService } from '../tag.service';
import { Tag } from '../tagDto/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
tags : Tag[];
clicked_tag : Tag ;
recipes_by_tag : Recipe[]
  constructor(
    private tags_service : TagService
  ) {
    this.tags_service.get_tags().subscribe((tags)=>
    this.tags=tags)
   }

  ngOnInit(): void {
  }

  show_tag_recipes(tag_id : number){
    this.tags_service.get_tag_by_id(tag_id).subscribe((tag)=>
      this.recipes_by_tag = tag.recipe
    )
  }
}

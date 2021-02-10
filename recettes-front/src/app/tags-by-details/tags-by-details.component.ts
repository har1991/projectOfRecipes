import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { TagService } from '../tag.service';
import { Tag } from '../tagDto/tag';

@Component({
  selector: 'app-tags-by-details',
  templateUrl: './tags-by-details.component.html',
  styleUrls: ['./tags-by-details.component.css']
})
export class TagsByDetailsComponent implements OnInit {
  clicked_tag : Tag ;
  tag_id : number
  constructor(
    private tag_service : TagService,
    private route_activate : ActivatedRoute
  ) { 
    this.route_activate.paramMap.pipe(mergeMap((params)=>{
      this.tag_id = Number(params.get('id'));
      this.tag_service.get_tag_by_id(this.tag_id).subscribe((tag)=>
       this.clicked_tag = tag);
      return "hello";
    })).subscribe()
    
  }
   

  ngOnInit(): void {
    console.log("hello")
  }

}

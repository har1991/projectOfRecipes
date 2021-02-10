import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tag } from './tagDto/tag';
import { TagDto } from './tagDto/tagDto';
import { TagGetDto } from './tagDto/TagGetDto';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }


  get_tags(): Observable<Tag[]> {
    return this.http.get<TagGetDto[]>(`http://localhost:9999/tag`).pipe(
      map((tags_dto: TagGetDto[]) => {
        return tags_dto.map((tag_dto: TagGetDto) => Tag.fromDb(tag_dto));
      }),
    )
  }
  get_tag_by_id(id: number): Observable<Tag> {
    return this.http.get<TagGetDto>(`http://localhost:9999/tag/${id}`).pipe(
      map((tag_dto: TagGetDto) => {
        return Tag.fromDb(tag_dto)
      })
    )
  }
  add_tag(tag: TagDto): Observable<Tag> {
    return this.http.post<TagGetDto>(`http://localhost:9999/tag`, tag).pipe(
      map((tag_dto: TagGetDto) => {
        return Tag.fromDb(tag_dto);
      })
    )
  }
  delete_tag(tag: Tag): Observable<{}> {
    return this.http.delete<{}>(`http://localhost:9999/tag/${tag.id}`);
  }
  update_tag(tag: TagDto): Observable<Tag> {
    return this.http.patch<TagDto>(`http://localhost:9999/tag/${tag.id}`, tag).pipe(
      map((tag_get_dto: TagGetDto) => {
        return Tag.fromDb(tag_get_dto)
      })
    )
  }
}

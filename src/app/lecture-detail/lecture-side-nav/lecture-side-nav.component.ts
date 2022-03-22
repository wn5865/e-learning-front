import { Component, HostListener, Input, SimpleChange } from '@angular/core';
import { Chapter } from 'src/app/shared/chapter';
import { Lecture } from 'src/app/shared/lecture';

@Component({
  selector: 'app-lecture-side-nav',
  templateUrl: './lecture-side-nav.component.html',
  styleUrls: ['./lecture-side-nav.component.css'],
})
export class LectureSideNavComponent {
  @Input() courseId: number = 0;
  @Input() lectureId: number = 0;
  @Input() chapters: Chapter[] = [];
  @Input() lectures: Lecture[][] = [];
  activeId: string = '';
  constructor() {}

  ngOnChanges(changes: SimpleChange) {
    this.activeId = `panel-${this.getChapterNumber()}`;
  }

  getChapterNumber(): number {
    return this.lectures.findIndex(
      (lecs) => lecs.findIndex((lec) => lec.id === this.lectureId) >= 0
    );
  }
}

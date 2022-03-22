import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Chapter } from 'src/app/shared/chapter';
import { Course } from 'src/app/shared/course';
import { CourseForm } from 'src/app/shared/course-form';
import { Lecture } from 'src/app/shared/lecture';
import { CourseService } from 'src/app/services/course.service';
import { CourseLevel } from 'src/app/shared/course-level';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user';
import { CourseCategory } from 'src/app/shared/course-category';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup;
  videos!: [{ video: File; chapter: number; lecture: number }];
  categories!: CourseCategory[];
  levels!: CourseLevel[];
  user: User;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private userService: UserService,
    private uploadService: UploadService,
    private router: Router
  ) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      level: ['', Validators.required],

      objectives: this.fb.group({
        objective_1: ['', [Validators.required]],
        objective_2: ['', [Validators.required]],
        objective_3: ['', [Validators.required]],
        objective_4: ['', [Validators.required]],
      }),

      requirement: ['', [Validators.required]],
      target: ['', [Validators.required]],

      image: ['', [Validators.required]],

      chapters: this.fb.array([this.createchapter()], Validators.required),
    });

    this.courseService
      .getCategories()
      .subscribe((data) => (this.categories = data));

    this.courseService.getLevels().subscribe((data) => (this.levels = data));
    this.user = this.userService.user!;
  }

  createchapter(): FormGroup {
    return this.fb.group({
      chapterTitle: ['', [Validators.required]],
      lectures: this.fb.array([this.createLecture()], Validators.required),
    });
  }

  createLecture(): FormGroup {
    return this.fb.group({
      lectureTitle: ['', [Validators.required]],
      lectureVideo: [null, [Validators.required]],
    });
  }

  addChapter(): void {
    this.chapters().push(this.createchapter());
  }

  addLecture(chapterId: number): void {
    this.lectures(chapterId).push(this.createLecture());
  }

  deleteChapter(id: number): void {
    this.chapters().removeAt(id);
  }

  deleteLecture(chapterId: number, lectureId: number): void {
    this.lectures(chapterId).removeAt(lectureId);
  }

  chapters(): FormArray {
    return this.courseForm.get('chapters') as FormArray;
  }

  lectures(chapterId: number): FormArray {
    const id = chapterId.toString();
    return this.chapters().get(id)!.get('lectures')! as FormArray;
  }

  ngOnInit(): void {}

  getImage(event: Event): void {
    const img = (event.target as HTMLInputElement).files?.[0];
    this.courseForm.patchValue({
      image: img,
    });
  }

  getVideos(event: Event, i: number, j: number): void {
    const vid = (event.target as HTMLInputElement).files?.[0];
    if (!vid) return;
    if (!this.videos) {
      this.videos = [
        {
          video: vid,
          chapter: i,
          lecture: j,
        },
      ];
      return;
    }

    let idx: number = this.videos.findIndex((vid) => {
      vid.chapter === i && vid.lecture === j;
    });

    const newVideo = { video: vid, chapter: i, lecture: j };

    if (idx < 0) {
      this.videos.push(newVideo);
    } else {
      this.videos[idx] = newVideo;
    }
  }

  onSubmit(): void {
    if (this.courseForm.invalid) return;
    const title = this.courseForm.get('title')!.value;
    const subtitle = this.courseForm.get('subtitle')!.value;
    const description = this.courseForm.get('description')!.value;
    let categoryId = this.courseForm.get('category')!.value;
    let levelId = this.courseForm.get('level')!.value;
    let objectives = this.courseForm.get('objectives')!.value;
    const requirement = this.courseForm.get('requirement')!.value;
    const target = this.courseForm.get('target')!.value;
    let chapterFormArray = this.courseForm.get('chapters') as FormArray;

    objectives = Object.values(objectives).join(',');
    categoryId = Number(categoryId);
    levelId = Number(levelId);

    let course: Course = {
      title,
      subtitle,
      description,
      objectives,
      requirement,
      target,
    };
    let instructor = this.user;
    let category: CourseCategory = {
      id: categoryId,
    };
    let level: CourseLevel = {
      id: levelId,
    };

    let videos: File[] = [];
    let chapters: Chapter[] = [];
    let lectures: Lecture[] = [];
    let groups: number[] = [];
    const image = this.courseForm.get('image')!.value as File;

    chapterFormArray.value.forEach((chapter: any, i: number) => {
      chapters.push({
        title: chapter.chapterTitle,
        sortOrder: i,
      });
      groups.push(chapter.lectures.length);
      chapter.lectures.map((lecture: any, j: number) =>
        lectures.push({
          title: lecture.lectureTitle,
          sortOrder: j,
        })
      );
    });

    if (this.videos) {
      this.videos.sort((a, b) =>
        a.chapter == b.chapter ? a.lecture - b.lecture : a.chapter - b.chapter
      );
      videos = this.videos.map((video) => video.video);
    }

    let courseForm: CourseForm = {
      course,
      instructor,
      level,
      category,
      chapters,
      lectures,
      groups,
    };

    try {
      this.uploadService.saveCourseForm(courseForm, videos, image);
      alert('강의가 등록되었습니다');
      this.router.navigateByUrl('/');
    } catch (error) {
      alert('강의 등록에 실패했습니다');
      this.router.navigateByUrl('/');
      console.log(error);
    }
  }

  scrollToTop() {
    window.scroll(0, 0);
  }
}

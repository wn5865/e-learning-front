import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CourseForm } from '../shared/course-form';
import appConfig from '../config/app-config';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  // Upload form data input
  async saveCourseForm(courseForm: CourseForm, videos: File[], image: File) {
    let baseUrl = `${appConfig.API_URL}/upload`;
    let returned: CourseForm = new CourseForm();

    await firstValueFrom(
      this.http.post<CourseForm>(`${baseUrl}/courses`, courseForm)
    )
      .then((res) => (returned = res))
      .catch((err) => {
        throw err;
      });

    let formDataForImage = new FormData();
    formDataForImage.append('course', returned?.course?.id?.toString() || '');
    formDataForImage.append('image', image);
    this.http.post(`${baseUrl}/images`, formDataForImage).subscribe({
      next: (res) => console.log(res),
      error: (error) => {
        throw error;
      },
    });

    videos.map((video, i) => {
      let formData = new FormData();
      formData.append('video', video);
      formData.append('lecture', returned?.lectures?.[i]?.id?.toString() || '');
      this.http.post(`${baseUrl}/videos`, formData).subscribe({
        next: (res) => console.log(res),
        error: (error) => {
          throw error;
        },
      });
    });
  }
}

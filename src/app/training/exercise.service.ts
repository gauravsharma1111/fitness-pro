import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExerciseService {
  availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 10, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];
  exerciseChanged = new Subject<Exercise>();
  private exercises: Exercise[] = [];
  private runningExercice: Exercise;
  getAvailableExercises() {
    return this.availableExercises.slice();
  }
  startExercise(exerciseId: string) {
    this.runningExercice = this.availableExercises.find(
      (ex) => ex.id === exerciseId
    );
    this.exerciseChanged.next({ ...this.runningExercice });
  }

  completeExercise() {
    this.exercises.push({
      ...this.runningExercice,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercice = null;
    this.exerciseChanged.next(null);
  }
  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercice,
      duration: this.runningExercice.duration * (progress / 100),
      calories: this.runningExercice.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercice = null;
    this.exerciseChanged.next(null);
  }
  getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  }
  getRunningExercise() {
    return { ...this.runningExercice };
  }
}

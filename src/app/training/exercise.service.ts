import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject, map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({ providedIn: 'root' })
export class ExerciseService {
  availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 10, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private runningExercice: Exercise;
  constructor(private fbs: AngularFirestore) {}
  fetchAvailableExercises() {
    this.fbs
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data()['name'],
              duration: doc.payload.doc.data()['duration'],
              calories: doc.payload.doc.data()['calories'],
            };
          });
        })
      )
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      });
  }
  startExercise(exerciseId: string) {
    this.runningExercice = this.availableExercises.find(
      (ex) => ex.id === exerciseId
    );
    this.exerciseChanged.next({ ...this.runningExercice });
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercice,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercice = null;
    this.exerciseChanged.next(null);
  }
  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercice,
      duration: this.runningExercice.duration * (progress / 100),
      calories: this.runningExercice.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercice = null;
    this.exerciseChanged.next(null);
  }
  fetchCompletedOrCancelledExercises() {
    this.fbs
      .collection('finishedExercises')
      .valueChanges()
      .pipe(
        map((docData) => {
          return docData.map((doc: Exercise) => {
            return {
              date: this.transformDateFormat(doc['date']),
              calories: doc['calories'],
              duration: doc['duration'],
              id: doc['id'],
              name: doc['name'],
              state: doc['state'],
            };
          });
        })
      )
      .subscribe((exercises: Exercise[]) => {
        this.finishedExercisesChanged.next([...exercises]);
      });
  }
  transformDateFormat(rawDate) {
    const timestamp = {
      seconds: rawDate.seconds,
      nanoseconds: rawDate.nanoseconds,
    };
    const milliseconds =
      timestamp.seconds * 1000 + Math.round(timestamp.nanoseconds / 1e6);
    const date = new Date(milliseconds);
    return date;
  }
  getRunningExercise() {
    return { ...this.runningExercice };
  }

  private addDataToDatabase(exercise: Exercise) {
    this.fbs.collection('finishedExercises').add(exercise);
  }
}

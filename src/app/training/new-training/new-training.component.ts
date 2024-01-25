import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @ViewChild('exerciceSelected') exerciceSelected: any;
  exercises: Exercise[] = [];
  exercisesSubscription: Subscription;
  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.exerciseService.fetchAvailableExercises();
    this.exercisesSubscription =
      this.exerciseService.exercisesChanged.subscribe(
        (exercises: Exercise[]) => {
          this.exercises = exercises;
        }
      );
  }
  onStartTraining(form: NgForm) {
    this.exerciseService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.exercisesSubscription.unsubscribe();
  }
}

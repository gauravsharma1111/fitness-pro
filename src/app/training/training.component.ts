import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExerciseService } from './exercise.service';
import { Exercise } from './exercise.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  onGoingTraining = false;
  exerciseSubscription: Subscription;
  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.exerciseService.exerciseChanged.subscribe((exercise: Exercise) => {
      if (exercise) {
        this.onGoingTraining = true;
      } else {
        this.onGoingTraining = false;
      }
    });
  }
  ngOnDestroy(): void {
    this.exerciseSubscription?.unsubscribe();
  }
}

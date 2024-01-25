import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;
  runningExercise: Exercise;
  constructor(
    private dialog: MatDialog,
    private ExerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    this.workoutProgression();
    this.runningExercise = this.ExerciseService.getRunningExercise();
  }

  workoutProgression() {
    const step =
      (this.ExerciseService.getRunningExercise().duration * 1000) / 100;
    this.timer = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        this.ExerciseService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }
  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: this.progress,
    });
    dialogRef.afterClosed().subscribe((result = false) => {
      if (!result) {
        this.workoutProgression();
      } else {
        this.ExerciseService.cancelExercise(this.progress);
      }
    });
  }
}

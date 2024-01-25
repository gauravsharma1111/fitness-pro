import { Component, OnInit, ViewChild } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  @ViewChild('exerciceSelected') exerciceSelected: any;
  exercises: Exercise[] = [];
  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.exercises = this.exerciseService.availableExercises;
  }
  onStartTraining(form: NgForm) {
    this.exerciseService.startExercise(form.value.exercise);
  }
}

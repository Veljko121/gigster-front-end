import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GenreService } from '../genre.service';
import { Genre } from '../model/genre.model';
import { NgFor, TitleCasePipe } from '@angular/common';
import { BandRequest } from '../model/band.request.model';
import { BandService } from '../band.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'gig-create-band',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgFor, TitleCasePipe],
  templateUrl: './create-band.component.html',
  styleUrls: ['./create-band.component.css', '../../shared-styles.css']
})
export class CreateBandComponent implements OnInit {

  genres: Genre[] = [];
  bandTypes: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<CreateBandComponent>,
    private bandService: BandService,
    private genreService: GenreService,
  ) {}
  
  ngOnInit(): void {
    this.loadGenres();
    this.loadBandTypes();
  }

  loadGenres(): void {
    this.genreService.getAll().subscribe({
      next: (result) => {
        this.genres = result.sort((a, b) => a.name.localeCompare(b.name));
        this.addGenreControls();
      },
      error: () => {
        alert('Error while loading genres.');
      }
    })
  }

  loadBandTypes(): void {
    // this.bandTypes = ['Acoustic', 'Arrangement', 'Rock'];
    // this.bandForm.get('type')?.setValue(this.bandTypes[0]);
    
    this.bandService.getBandTypes().subscribe({
      next: result => {
        this.bandTypes = result;
        this.bandForm.get('type')?.setValue(this.bandTypes[0]);
      }
    })
  }

  bandForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required, Validators.email]),
    genres: new FormArray([], [Validators.required]),
  });

  addGenreControls(): void {
    this.genres.forEach(() => {
      (this.bandForm.get('genres') as FormArray).push(new FormControl(false));
    });
  }

  getSelectedGenres(): number[] {
    const genres = this.bandForm.value.genres;

    if (!genres) return [];
  
    const selectedGenreIds = genres
      .map((checked: boolean, i: number) => (checked ? this.genres[i].id : null))
      .filter((id): id is number => id !== null);
  
    return selectedGenreIds;
  }  

  createBand(): void {
    const bandRequest = this.mapToRequestDTO();
    this.bandService.createBand(bandRequest).subscribe({
      next: result => {
        this.dialogRef.close(result);
      },
      error: () => {
        alert('Error while creating a band.');
      }
    })
  }

  mapToRequestDTO(): BandRequest {
    const values = this.bandForm.value;
    const bandRequest: BandRequest = {
      name: values.name || '',
      description: values.description || '',
      type: values.type?.toLocaleUpperCase() || '',
      genreIds: this.getSelectedGenres(),
    }
    return bandRequest;
  }

}

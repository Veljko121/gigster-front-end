import { Component, Inject, input, OnInit } from '@angular/core';
import { Genre } from '../model/genre.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BandService } from '../band.service';
import { GenreService } from '../genre.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BandRequest } from '../model/band.request.model';
import { Band } from '../model/band.model';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { DefaultImageDirective } from '../../../directives/default-image.directive';

@Component({
  selector: 'gig-update-band',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    TitleCasePipe,
    DefaultImageDirective
  ],
  templateUrl: './update-band.component.html',
  styleUrls: [
    './update-band.component.css',
    '../shared-styles.css',
    '../../shared-styles.css'
  ]
})
export class UpdateBandComponent implements OnInit {

  band: Band;
  genres: Genre[] = [];
  bandTypes: string[] = [];
  photoUrl: string | ArrayBuffer | null = null;
  image?: File;

  bandForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required, Validators.email]),
    genres: new FormArray([], [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<UpdateBandComponent>,
    private bandService: BandService,
    private genreService: GenreService,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    this.band = data.band;
    this.bandForm.patchValue({
      name: this.band.name,
      description: this.band.description,
    })
  }
  
  ngOnInit(): void {
    this.loadGenres();
    this.loadBandTypes();
    this.loadBandPhoto();
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
    this.bandService.getBandTypes().subscribe({
      next: result => {
        this.bandTypes = result;

        for (let bandType of this.bandTypes) {
          if (this.band.type === bandType) {
            this.bandForm.get('type')?.setValue(bandType);
            break;
          }
        }
      }
    })
  }

  loadBandPhoto(): void {
    this.photoUrl = this.bandService.getBandPhoto(this.band.id);
  }

  addGenreControls(): void {
    this.genres.forEach((genre) => {
      const contains = this.band.genres.some(bandGenre => bandGenre.id === genre.id);
      (this.bandForm.get('genres') as FormArray).push(new FormControl(contains));
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

  updateBand(): void {
    const bandRequest = this.mapToRequestDTO();
    this.bandService.updateBand(this.band.id, bandRequest).subscribe({
      next: result => {
        if (this.image) {
          this.bandService.uploadBandPhoto(this.image, result.id).subscribe({
            next: result => {
              this.dialogRef.close(result);
            },
            error: result => {
              alert("Error while uploading band photo.");
            }
          });
        }
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

  openFile(): void {
    document.getElementById('band-photo-dialog')?.click();
  }

  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.image = input.files[0];

      const reader = new FileReader();

      reader.onload = () => {
        this.photoUrl = reader.result;
      };

      reader.readAsDataURL(this.image);
    }
  }

}

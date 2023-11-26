import { Component, OnInit, inject } from '@angular/core';
import { StorageService } from '../../_services/storage.service';
import { UserService } from '../../_services/user.service';
import { MatDialog,  } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/util/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;
  private dialog = inject(MatDialog);
  errorMessage = '';

  constructor(
    private storageService: StorageService, 
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.user = this.storageService.getUser().user;
    }
  }

  confirmDelete(): void {
    const message = 'Are you sure you want to delete the profile?';
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: message 
    })

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const userId = this.user.id;

        this.userService.deleteUser(userId).subscribe({
          next: rsp => {
            this.storageService.clean();
            this.reloadPage();
          },
          error: err => {
            this.errorMessage = err.error.message;
          }
        });
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}

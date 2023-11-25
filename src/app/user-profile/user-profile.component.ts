import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';
// import { ConfirmationDialogService } from '../_services/confirmation-dialog.service';
// import { EditDialogService } from '../_services/edit-dialog.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;

  constructor(
    private storageService: StorageService, 
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.user = this.storageService.getUser().user;
    }
  }

  // confirmDelete(): void {
  //   const message = 'Are you sure you want to delete the profile?';

  //   this.confirmationDialogService.openConfirmationDialog(message)
  //     .subscribe((confirmed: boolean) => {
  //       if (confirmed) {
  //         // Send delete request to the backend
  //         this.userService.deleteUser(this.user.id).subscribe(() => {
  //           // Handle success (e.g., navigate to login)
  //         });
  //       }
  //     });
  // }

  // openEditPopup(): void {
  //   this.editDialogService.openEditDialog(this.user)
  //     .subscribe((updatedUser: any) => {
  //       // Handle the updated user data
  //       if (updatedUser) {
  //         // Send update request to the backend
  //         this.userService.updateUser(updatedUser).subscribe(() => {
  //           // Handle success
  //           this.user = updatedUser; // Update the user data in the component
  //         });
  //       }
  //     });
  // }
}

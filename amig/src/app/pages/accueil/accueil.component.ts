import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Commentaires } from 'src/app/entities/comment';
import { Publication } from 'src/app/entities/publication';
import { User } from 'src/app/entities/user';
import { AvisService } from 'src/app/service/avis.service';


interface Comment {
  id: number;
  text: string;
  author: string;
}



@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent  {
    currentUser: string;
    comments: { user: string; text: string }[] = [{user:"bachir karroudi",text:"welcome"}];
    posts: Publication[] = [];
    showCommentSection=false;
    addLike=true;
    style={"color":"black"};
    constructor(private avisService: AvisService // Ajoutez cette ligne
    ) {}
    ngOnInit() {
      this.avisService.getAvis().subscribe(
        response => {
          const avis: Publication[] = response as unknown as Publication[];
          this.posts=avis;
        },
        error => {
          console.error(error);
        }
      )
    }
    likePost(id): void {
      const PostAct=this.posts.filter((post) => post.id === id)[0];
      if(this.addLike)
      {
        PostAct.likes++;
        this.addLike=false;
        this.style={"color":"blue"};
      }
      else{
        PostAct.likes--;
        this.addLike=true;
        this.style={"color":"black"};
      }
      var p=new Publication();
      p.likes=PostAct.likes;
      this.avisService.updateAvisLike(id,p).subscribe(
        response => {
        });
    }
    newComment: Commentaires={
      user: new User, 
      content: "",
      id: null,
      date: undefined
    };

    addComment(id): void {
      const PostAct = this.posts.find((post) => post.id === id);
    
      if (this.newComment.content.trim()) {
        const userAct = JSON.parse(localStorage.getItem('user'));
        const user = new User();
        user.id = userAct.id;
        user.firstname = userAct.firstname;
        user.lastname = userAct.lastname;
        user.email = userAct.email;
        user.role = userAct.role;
    
        const com = new Commentaires();
        com.content = this.avisService.censorText(this.newComment.content);
        com.user = user;
    
        if (!PostAct.commentaires) {
          PostAct.commentaires = [];
        }
    
        PostAct.commentaires.push(com);
    
        this.avisService.addCommentToPublication(PostAct.id, com).subscribe(
          response => {
            // Handle success if needed
          },
          error => {
            console.error(error);
          }
        );
    
        // Clear the content for the next comment
        this.newComment.content = '';
      }
    }
    
    Comment() {
      this.showCommentSection = !this.showCommentSection;
    }
    updateComment(commentId: string, comment: Commentaires): void {
      // Appeler la méthode updateComment du service AvisService
      this.avisService.updateComment(commentId, comment).subscribe(updatedComment => {
        // Traiter la mise à jour réussie du commentaire si nécessaire
      });
    }
  
  }

  
  
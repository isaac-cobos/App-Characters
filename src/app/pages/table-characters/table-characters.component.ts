import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { CharactersService } from 'src/app/services/characters.service';


@Component({
  selector: 'app-table-characters',
  templateUrl: './table-characters.component.html',
  styleUrls: ['./table-characters.component.css']
})
export class TableCharactersComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  public characters: any = [];
  public filtroTabla: any[] = [];

  displayedColumns: string[] = ['name', 'gender', 'died'];
  dataSource = new MatTableDataSource(this.characters);
  pageEvent!: PageEvent;
  currentPage = 1;
  public genderCharacter = ['Female', 'Male'];
  unsubscribe: Subject<void> = new Subject();

  constructor(private charactersService: CharactersService) {
  }

  ngOnInit(): void {
    this.getCharacters();
  }

  ngAfterViewInit() {
    this.charactersService.getCharactersSaved().subscribe(characters => {
      this.characters = characters;
      this.dataSource.data = [...this.characters];
    })
    this.dataSource.paginator = this.paginator;
  }


  /**
   * Get characters
   */
  getCharacters() {
    this.charactersService.getCharacters(this.currentPage).pipe(takeUntil(this.unsubscribe)).subscribe(character => {
      this.charactersService.saveCharacters(character);
    })
  }
  /**
   * Listen change page to get current page
   * @param event Page Event
   */
  setPage(event: PageEvent) {
    const lastPageVisited = event.length / 6;
    this.currentPage = event.pageIndex + 1;
    if (lastPageVisited < this.currentPage) this.getCharacters();
  }

  /**
   * Filter table from the options
   * @param gender string
   */
  filterGender(gender: string) {
    const valorFiltrado = this.characters.filter((character: any) => {
      return this.characterFilterByGender(character, gender)
        || this.characterNoGender(gender)
    })
    this.filtroTabla = [...valorFiltrado];
    this.dataSource.data = [...this.filtroTabla];
  }

  /**
   * 
   * @param character Object
   * @param gender string
   * @returns characters filteres by option
   */
  characterFilterByGender(character: any, gender: string) {
    return character.gender === gender;
  }

  /**
   * 
   * @param gender string
   * @returns all characters
   */
  characterNoGender(gender: string) {
    return gender === 'noFilter'
  }

  /**
   * Filter by alive field
   * @param alive string
   */
  filteAlive(alive: string) {
    const valorFiltrado = this.characters.filter((character: any) => {
      return this.characterAliveNoFilter(alive)
        || this.characterAlive(alive, character)
    })
    this.filtroTabla = [...valorFiltrado];
    this.dataSource.data = [...this.filtroTabla];
  }


  /**
   * 
   * @param character object
   * @returns characters alive no
   */
  characterAlive(alive: string, character: any) {
    return alive === 'yes' ? character.died !== '' : character.died === ''
  }
  /**
   * 
   * @returns all characters no filters
   */
  characterAliveNoFilter(alive: string) {
    if (alive === 'noFilter') return this.characters;
  }

  ngOnDestroy() {
    // Unsubscribe observable when destroy component
    this.unsubscribe.next()
    this.unsubscribe.complete();
  }

}

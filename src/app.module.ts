import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlunosHttpModule } from "./alunos/alunos-http.module";
import { Aluno } from "./alunos/aluno.entity";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CategoriasHttpModule } from "./categorias/categorias-http.module";
import { Categoria } from "./categorias/categoria.entity";
import { DirecaoHttpModule } from "./direcao/direcao-http.module";
import { Direcao } from "./direcao/direcao.entity";
import { EmprestimoAluno } from "./emprestimos/emprestimo-aluno.entity";
import { EmprestimoProfessor } from "./emprestimos/emprestimo-professor.entity";
import { EmprestimosHttpModule } from "./emprestimos/emprestimos-http.module";
import { Item } from "./itens/item.entity";
import { ItensHttpModule } from "./itens/itens-http.module";
import { Professor } from "./professores/professor.entity";
import { ProfessoresHttpModule } from "./professores/professores-http.module";
import { Turma } from "./turmas/turma.entity";
import { TurmasHttpModule } from "./turmas/turmas-http.module";
import { User } from "./user/user.entity";
import { UserHttpModule } from "./user/users-http.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "site_de_estoque",
      entities: [
        User,
        Aluno,
        Categoria,
        Direcao,
        EmprestimoAluno,
        EmprestimoProfessor,
        Item,
        Professor,
        Turma,
      ],
      synchronize: false,
    }),
    UserHttpModule,
    AlunosHttpModule,
    CategoriasHttpModule,
    DirecaoHttpModule,
    EmprestimosHttpModule,
    ItensHttpModule,
    ProfessoresHttpModule,
    TurmasHttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

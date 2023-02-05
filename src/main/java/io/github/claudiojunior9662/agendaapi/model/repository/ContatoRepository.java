package io.github.claudiojunior9662.agendaapi.model.repository;

import io.github.claudiojunior9662.agendaapi.model.entity.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository extends JpaRepository<Contato, Integer> {
}

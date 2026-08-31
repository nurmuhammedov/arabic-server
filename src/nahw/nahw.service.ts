import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { t } from '../common/helpers/i18n.helper'
import { Ayah } from '../words/entities/ayah.entity'
import { IrabExample } from './entities/irab-example.entity'
import { NahwTopic } from './entities/nahw-topic.entity'
import { IrabCause } from './enums/nahw.enum'

@Injectable()
export class NahwService {
  constructor(
    @InjectRepository(NahwTopic) private readonly topics: Repository<NahwTopic>,
    @InjectRepository(IrabExample) private readonly examples: Repository<IrabExample>,
    @InjectRepository(Ayah) private readonly ayahs: Repository<Ayah>
  ) {}

  listTopics() {
    return this.topics.find({ order: { position: 'ASC' } })
  }

  async getTopic(slug: string) {
    const topic = await this.topics.findOne({ where: { slug } })
    if (!topic) throw new NotFoundException(t('common.nahw_topic.not_found', 'Topic not found'))

    const example =
      topic.exampleSura && topic.exampleAyah
        ? await this.ayahs.findOne({ where: { sura: topic.exampleSura, ayah: topic.exampleAyah } })
        : null

    return { ...topic, example }
  }

  /**
   * An iʿrāb challenge from a real verse. Short verses come first because the
   * learner has to hold the whole sentence in mind to see what caused the ending.
   */
  async getChallenge(cause?: IrabCause, maxWords = 12) {
    const query = this.examples.createQueryBuilder('example').where('example.ayah_words <= :maxWords', { maxWords })

    if (cause) query.andWhere('example.cause = :cause', { cause })

    const example = await query.orderBy('RANDOM()').getOne()
    if (!example) throw new NotFoundException(t('common.irab.not_found', 'No example found'))

    const verse = await this.ayahs.findOne({ where: { sura: example.sura, ayah: example.ayah } })

    return {
      id: example.id,
      sura: example.sura,
      ayah: example.ayah,
      wordIndex: example.wordIndex,
      surfaceForm: example.surfaceForm,
      irabCase: example.irabCase,
      cause: example.cause,
      triggerForm: example.triggerForm,
      text: verse?.text ?? null
    }
  }

  /** How many drill items exist per cause, so the UI can show what is available. */
  async getCauseCounts() {
    const rows = await this.examples
      .createQueryBuilder('example')
      .select('example.cause', 'cause')
      .addSelect('COUNT(*)', 'count')
      .groupBy('example.cause')
      .getRawMany<{ cause: IrabCause; count: string }>()

    return rows.map((row) => ({ cause: row.cause, count: Number(row.count) })).sort((a, b) => b.count - a.count)
  }
}
